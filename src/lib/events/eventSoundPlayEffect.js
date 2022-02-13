const l10n = require("../helpers/l10n").default;

const id = "EVENT_SOUND_PLAY_EFFECT";
const groups = ["EVENT_GROUP_MUSIC"];

const fields = [
  {
    key: "type",
    type: "soundEffect",
    label: l10n("FIELD_SOUND_EFFECT"),
    defaultValue: "beep",
    flexBasis: "100%",
  },
  {
    key: "pitch",
    type: "number",
    label: l10n("FIELD_PITCH"),
    conditions: [
      {
        key: "type",
        eq: "beep",
      },
    ],
    min: 1,
    max: 8,
    step: 1,
    defaultValue: 4,
  },
  {
    key: "frequency",
    type: "number",
    label: l10n("FIELD_FREQUENCY"),
    conditions: [
      {
        key: "type",
        eq: "tone",
      },
    ],
    min: 0,
    max: 20000,
    step: 1,
    defaultValue: 200,
  },
  {
    key: "duration",
    type: "number",
    label: l10n("FIELD_DURATION"),
    conditions: [
      {
        key: "type",
        in: ["beep", "crash", "tone"],
      },
    ],
    min: 0,
    max: 4.25,
    step: 0.01,
    defaultValue: 0.5,
  },
  {
    key: "wait",
    type: "checkbox",
    label: l10n("FIELD_WAIT_UNTIL_FINISHED"),
    conditions: [
      {
        key: "type",
        in: ["beep", "crash", "tone"],
      },
    ],
    defaultValue: true,
    flexBasis: "100%",
  },
];

const compile = (input, helpers) => {
  const { soundPlayBeep, soundStartTone, soundPlayCrash, wait } = helpers;

  let seconds = typeof input.duration === "number" ? input.duration : 0.5;

  if (input.type === "beep" || !input.type) {
    const pitch = typeof input.pitch === "number" ? input.pitch : 4;
    soundPlayBeep(9 - pitch);
  } else if (input.type === "tone") {
    const freq = typeof input.frequency === "number" ? input.frequency : 200;
    let period = (2048 - 131072 / freq + 0.5) | 0;
    if (period >= 2048) {
      period = 2047;
    }
    if (period < 0) {
      period = 0;
    }
    const toneFrames = Math.min(255, Math.ceil(seconds * 60));
    soundStartTone(period, toneFrames);
  } else if (input.type === "crash") {
    soundPlayCrash();
  }

  // Convert seconds into frames (60fps)
  if (input.wait) {
    while (seconds > 0) {
      const time = Math.min(seconds, 1);
      wait(Math.ceil(60 * time));
      seconds -= time;
    }
  }
};

module.exports = {
  id,
  groups,
  fields,
  compile,
};
