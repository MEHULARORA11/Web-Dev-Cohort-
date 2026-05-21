import { useState, useEffect, useRef, useCallback } from 'react';
import './TimerStopwatch.css';

// ── helpers ──────────────────────────────────────────────────────────────────
const pad = (n) => String(n).padStart(2, '0');

function playAlarm() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ac = new AudioCtx();
    const beep = (freq, start, dur) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ac.currentTime + start);
      gain.gain.linearRampToValueAtTime(0.45, ac.currentTime + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + start + dur);
      osc.start(ac.currentTime + start);
      osc.stop(ac.currentTime + start + dur + 0.05);
    };
    [0, 0.3, 0.6, 0.9, 1.2].forEach((t) => beep(900 + t * 60, t, 0.22));
  } catch (_) {}
}

// ── SVG icons ────────────────────────────────────────────────────────────────
const IconPlay    = () => <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" /></svg>;
const IconPause   = () => <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>;
const IconReset   = () => <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.5" /></svg>;
const IconLap     = () => <svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9" /><polyline points="3 3 3 9 9 9" /></svg>;
const IconTimer   = () => <svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" /><path d="M12 5V2M9 2h6" /><path d="M12 9v4l3 2" /></svg>;
const IconWatch   = () => <svg viewBox="0 0 24 24"><circle cx="12" cy="14" r="8" /><path d="M12 6V3M9 3h6M5 5l1.5 1.5M19 5l-1.5 1.5" /><path d="M12 10v4l2.5 2.5" /></svg>;

// ── AdjustUnit ────────────────────────────────────────────────────────────────
function AdjustUnit({ label, value, onInc, onDec, disabled }) {
  return (
    <div className="ts-adj-unit">
      <label>{label}</label>
      <button className="ts-adj-btn" onClick={onInc} disabled={disabled}>+</button>
      <span className="ts-adj-val">{pad(value)}</span>
      <button className="ts-adj-btn" onClick={onDec} disabled={disabled}>−</button>
    </div>
  );
}

// ── StatusDot ─────────────────────────────────────────────────────────────────
function StatusDot({ status }) {
  return (
    <div className="ts-status-row">
      <div className={`ts-dot ${status}`} />
      <span className="ts-status-text">{status}</span>
    </div>
  );
}

// ── TIMER PANEL ───────────────────────────────────────────────────────────────
function TimerPanel() {
  const CIRCUMFERENCE = 326.7;

  const [hours,   setHours]   = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const [remaining,   setRemaining]   = useState(300);
  const [startTotal,  setStartTotal]  = useState(300);
  const [status,      setStatus]      = useState('ready'); // ready | running | paused | done
  const [showChips,   setShowChips]   = useState(false);

  const intervalRef  = useRef(null);
  const remainingRef = useRef(300);

  // keep ref in sync so the interval closure always reads fresh value
  useEffect(() => { remainingRef.current = remaining; }, [remaining]);

  const total = hours * 3600 + minutes * 60 + seconds;

  const pct    = startTotal > 0 ? remaining / startTotal : 1;
  const offset = (CIRCUMFERENCE * (1 - pct)).toFixed(2);
  const arcColor = pct > 0.25 ? '#6c63ff' : '#ff5757';

  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;

  // ── start ──
  const start = useCallback(() => {
    const t = hours * 3600 + minutes * 60 + seconds;
    if (t === 0) return;
    remainingRef.current = t;
    setRemaining(t);
    setStartTotal(t);
    setStatus('running');
    setShowChips(true);
    intervalRef.current = setInterval(() => {
      remainingRef.current -= 1;
      if (remainingRef.current <= 0) {
        remainingRef.current = 0;
        clearInterval(intervalRef.current);
        setRemaining(0);
        setStatus('done');
        setShowChips(false);
        playAlarm();
      } else {
        setRemaining(remainingRef.current);
      }
    }, 1000);
  }, [hours, minutes, seconds]);

  // ── resume ──
  const resume = useCallback(() => {
    setStatus('running');
    setShowChips(true);
    intervalRef.current = setInterval(() => {
      remainingRef.current -= 1;
      if (remainingRef.current <= 0) {
        remainingRef.current = 0;
        clearInterval(intervalRef.current);
        setRemaining(0);
        setStatus('done');
        setShowChips(false);
        playAlarm();
      } else {
        setRemaining(remainingRef.current);
      }
    }, 1000);
  }, []);

  // ── pause ──
  const pause = useCallback(() => {
    clearInterval(intervalRef.current);
    setStatus('paused');
    setShowChips(false);
  }, []);

  // ── reset ──
  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    const t = hours * 3600 + minutes * 60 + seconds;
    remainingRef.current = t;
    setRemaining(t);
    setStartTotal(t);
    setStatus('ready');
    setShowChips(false);
  }, [hours, minutes, seconds]);

  // ── add time chips ──
  const addTime = (sec) => {
    const next = Math.max(0, remainingRef.current + sec);
    remainingRef.current = next;
    setRemaining(next);
    setStartTotal((prev) => Math.max(prev, next));
  };

  // cleanup on unmount
  useEffect(() => () => clearInterval(intervalRef.current), []);

  const isIdle    = status === 'ready';
  const isRunning = status === 'running';
  const isPaused  = status === 'paused';
  const isDone    = status === 'done';

  return (
    <div className="ts-body">
      {/* ring */}
      <div className="ts-ring-wrap">
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle className="ts-ring-track" cx="65" cy="65" r="52" />
          <circle
            className="ts-ring-fill"
            cx="65" cy="65" r="52"
            stroke={arcColor}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        </svg>
      </div>

      {/* time */}
      <div className="ts-time-display">
        <div className="ts-time-big">
          {remaining >= 3600 && <>{pad(h)}<span className="ts-time-sep">:</span></>}
          {pad(m)}<span className="ts-time-sep">:</span>{pad(s)}
        </div>
        <StatusDot status={status} />
      </div>

      {/* adjust grid — only when idle */}
      {isIdle && (
        <div className="ts-adj-grid">
          <AdjustUnit label="Hours"   value={hours}   onInc={() => setHours(h => Math.max(0, h + 1))}   onDec={() => setHours(h => Math.max(0, h - 1))} />
          <AdjustUnit label="Minutes" value={minutes} onInc={() => setMinutes(m => Math.min(59, m + 1))} onDec={() => setMinutes(m => Math.max(0, m - 1))} />
          <AdjustUnit label="Seconds" value={seconds} onInc={() => setSeconds(s => Math.min(59, s + 1))} onDec={() => setSeconds(s => Math.max(0, s - 1))} />
        </div>
      )}

      {/* add-time chips — while running */}
      {showChips && (
        <div className="ts-chips">
          {[['30s', 30], ['1m', 60], ['5m', 300], ['10m', 600]].map(([label, sec]) => (
            <button key={label} className="ts-chip" onClick={() => addTime(sec)}>+{label}</button>
          ))}
        </div>
      )}

      {/* done banner */}
      {isDone && <div className="ts-done-banner">✓ &nbsp;Time's up!</div>}

      {/* controls */}
      <div className="ts-controls">
        {isIdle && (
          <button className="ts-btn primary" onClick={start}>
            <IconPlay /> Start
          </button>
        )}
        {isRunning && (
          <>
            <button className="ts-btn" onClick={pause}><IconPause /> Pause</button>
            <button className="ts-btn danger" onClick={reset}><IconReset /> Reset</button>
          </>
        )}
        {isPaused && (
          <>
            <button className="ts-btn primary" onClick={resume}><IconPlay /> Resume</button>
            <button className="ts-btn danger" onClick={reset}><IconReset /> Reset</button>
          </>
        )}
        {isDone && (
          <button className="ts-btn primary" onClick={reset}><IconReset /> Reset</button>
        )}
      </div>
    </div>
  );
}

// ── STOPWATCH PANEL ───────────────────────────────────────────────────────────
function StopwatchPanel() {
  const [initH, setInitH] = useState(0);
  const [initM, setInitM] = useState(0);
  const [initS, setInitS] = useState(0);

  const [elapsed, setElapsed] = useState(0);  // centiseconds
  const [status,  setStatus]  = useState('ready');
  const [laps,    setLaps]    = useState([]);

  const intervalRef = useRef(null);
  const elapsedRef  = useRef(0);
  const lastLapRef  = useRef(0);

  useEffect(() => { elapsedRef.current = elapsed; }, [elapsed]);

  const h  = Math.floor(elapsed / 360000);
  const m  = Math.floor((elapsed % 360000) / 6000);
  const s  = Math.floor((elapsed % 6000) / 100);
  const ms = elapsed % 100;

  // ── start ──
  const start = useCallback(() => {
    const init = (initH * 3600 + initM * 60 + initS) * 100;
    elapsedRef.current = init;
    lastLapRef.current = init;
    setElapsed(init);
    setLaps([]);
    setStatus('running');
    intervalRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setElapsed(elapsedRef.current);
    }, 10);
  }, [initH, initM, initS]);

  // ── resume ──
  const resume = useCallback(() => {
    setStatus('running');
    intervalRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setElapsed(elapsedRef.current);
    }, 10);
  }, []);

  // ── pause ──
  const pause = useCallback(() => {
    clearInterval(intervalRef.current);
    setStatus('paused');
  }, []);

  // ── reset ──
  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    elapsedRef.current = 0;
    lastLapRef.current = 0;
    setElapsed(0);
    setLaps([]);
    setStatus('ready');
    setInitH(0); setInitM(0); setInitS(0);
  }, []);

  // ── lap ──
  const lap = useCallback(() => {
    const lapTime = elapsedRef.current - lastLapRef.current;
    lastLapRef.current = elapsedRef.current;
    const lms = lapTime % 100;
    const ls  = Math.floor((lapTime % 6000) / 100);
    const lm  = Math.floor(lapTime / 6000);
    setLaps((prev) => [{ id: Date.now(), label: `Lap ${prev.length + 1}`, time: `${pad(lm)}:${pad(ls)}.${pad(lms)}` }, ...prev]);
  }, []);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const isIdle    = status === 'ready';
  const isRunning = status === 'running';
  const isPaused  = status === 'paused';

  return (
    <div className="ts-body">
      {/* time */}
      <div className="ts-time-display" style={{ marginBottom: '1.5rem' }}>
        <div className="ts-time-big">
          {elapsed >= 360000 && <>{pad(h)}<span className="ts-time-sep">:</span></>}
          {pad(m)}<span className="ts-time-sep">:</span>{pad(s)}
          <span className="ts-time-ms">.{pad(ms)}</span>
        </div>
        <StatusDot status={status} />
      </div>

      {/* adjust grid — only when idle */}
      {isIdle && (
        <div className="ts-adj-grid">
          <AdjustUnit label="Hours"   value={initH} onInc={() => setInitH(v => Math.max(0, v + 1))}   onDec={() => setInitH(v => Math.max(0, v - 1))} />
          <AdjustUnit label="Minutes" value={initM} onInc={() => setInitM(v => Math.min(59, v + 1))} onDec={() => setInitM(v => Math.max(0, v - 1))} />
          <AdjustUnit label="Seconds" value={initS} onInc={() => setInitS(v => Math.min(59, v + 1))} onDec={() => setInitS(v => Math.max(0, v - 1))} />
        </div>
      )}

      {/* controls */}
      <div className="ts-controls">
        {isIdle && (
          <button className="ts-btn primary" onClick={start}><IconPlay /> Start</button>
        )}
        {isRunning && (
          <>
            <button className="ts-btn"        onClick={pause}><IconPause /> Pause</button>
            <button className="ts-btn danger"  onClick={reset}><IconReset /> Reset</button>
            <button className="ts-btn lap"     onClick={lap}><IconLap /> Lap</button>
          </>
        )}
        {isPaused && (
          <>
            <button className="ts-btn primary" onClick={resume}><IconPlay /> Resume</button>
            <button className="ts-btn danger"  onClick={reset}><IconReset /> Reset</button>
          </>
        )}
      </div>

      {/* laps */}
      {laps.length > 0 && (
        <div className="ts-laps-wrap">
          {laps.map((lap) => (
            <div key={lap.id} className="ts-lap-row">
              <span className="ts-lap-label">{lap.label}</span>
              <span className="ts-lap-time">{lap.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── ROOT COMPONENT ────────────────────────────────────────────────────────────
export default function TimerStopwatch() {
  const [activeTab, setActiveTab] = useState('timer');

  return (
    <div className="ts-wrapper">
      <div className="ts-inner">
        <p className="ts-title">⏱ Timer &amp; Stopwatch</p>
        <div className="ts-card">

          {/* tabs */}
          <div className="ts-tabs">
            <button
              className={`ts-tab${activeTab === 'timer' ? ' active' : ''}`}
              onClick={() => setActiveTab('timer')}
            >
              <IconTimer /> Timer
            </button>
            <button
              className={`ts-tab${activeTab === 'stopwatch' ? ' active' : ''}`}
              onClick={() => setActiveTab('stopwatch')}
            >
              <IconWatch /> Stopwatch
            </button>
          </div>

          {/* panels */}
          {activeTab === 'timer'     && <TimerPanel />}
          {activeTab === 'stopwatch' && <StopwatchPanel />}

        </div>
      </div>
    </div>
  );
}
