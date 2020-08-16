import React, { useContext, useState, Fragment } from 'react';
import SynthContext from '../context/synth/synthContext';

const Envelope = () => {
  const synthContext = useContext(SynthContext);
  const { audioCtx, masterGain } = synthContext;

  const [attackTime, setAttackTime] = useState(1);
  const [releaseTime, setReleaseTime] = useState(1);

  const onClick = () => {
    if (audioCtx && masterGain) {
      let now = audioCtx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(1, now + attackTime);
      masterGain.gain.linearRampToValueAtTime(
        0,
        now + attackTime + releaseTime
      );
    } else return;
  };

  const onAttack = (e) => {
    let x = Number(e.target.value);
    setAttackTime(x);
  };

  const onRelease = (e) => {
    let x = Number(e.target.value);
    setReleaseTime(x);
  };

  return (
    <Fragment>
      <button onClick={() => onClick()} />
      <input
        type={'range'}
        min={0}
        max={1}
        step={0.1}
        defaultValue={attackTime}
        onChange={(e) => onAttack(e)}
      />
      <input
        type={'range'}
        min={0}
        max={1}
        step={0.1}
        defaultValue={releaseTime}
        onChange={(e) => onRelease(e)}
      />
    </Fragment>
  );
};

export default Envelope;
