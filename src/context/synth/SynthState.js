import React, { useReducer } from 'react';
import SynthContext from './synthContext';
import SynthReducer from './synthReducer';
import {
  CREATE_AUDIO_CTX,
  CREATE_ANALYSER,
  CREATE_MODULATOR,
  CREATE_CARRIER,
  CREATE_MOD_GAIN,
  CREATE_MASTER_GAIN,
} from '../types';

const SynthState = (props) => {
  const initialState = {
    audioCtx: null,
    analyser: null,
    oscillator: null,
    modGain: null,
    masterGain: null,
  };

  const [state, dispatch] = useReducer(SynthReducer, initialState);

  const createAudioCtx = () => {
    const audioCtx = new AudioContext();

    dispatch({
      type: CREATE_AUDIO_CTX,
      payload: audioCtx,
    });
  };

  const createAnalyser = (audioCtx) => {
    const analyser = audioCtx.createAnalyser();

    dispatch({
      type: CREATE_ANALYSER,
      payload: analyser,
    });
  };

  const createModulator = (audioCtx) => {
    const modulator = audioCtx.createOscillator();
    modulator.frequency.value = 44;
    dispatch({
      type: CREATE_MODULATOR,
      payload: modulator,
    });
  };

  const createCarrier = (audioCtx) => {
    const carrier = audioCtx.createOscillator();
    carrier.frequency.value = 44;
    dispatch({
      type: CREATE_CARRIER,
      payload: carrier,
    });
  };

  // modulation depth
  const createModGain = (audioCtx) => {
    const modGain = audioCtx.createGain();
    modGain.gain.value = 40;

    dispatch({
      type: CREATE_MOD_GAIN,
      payload: modGain,
    });
  };

  const createMasterGain = (audioCtx) => {
    const masterGain = audioCtx.createGain();
    masterGain.gain.value = 0;

    dispatch({
      type: CREATE_MASTER_GAIN,
      payload: masterGain,
    });
  };

  return (
    <SynthContext.Provider
      value={{
        audioCtx: state.audioCtx,
        analyser: state.analyser,
        modulator: state.modulator,
        carrier: state.carrier,
        modGain: state.modGain,
        masterGain: state.masterGain,
        createAnalyser,
        createModulator,
        createAudioCtx,
        createCarrier,
        createModGain,
        createMasterGain,
      }}
    >
      {props.children}
    </SynthContext.Provider>
  );
};

export default SynthState;
