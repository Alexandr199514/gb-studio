import React from "react";
import { useDispatch } from "react-redux";
import l10n from "../../lib/helpers/l10n";
import trackerActions from "../../store/features/tracker/trackerActions";
import { WaveInstrument } from "../../store/features/tracker/trackerTypes";
import { FormDivider, FormField, FormRow } from "../ui/form/FormLayout";
import { Select } from "../ui/form/Select";
import { InstrumentLengthForm } from "./InstrumentLengthForm";
import { WaveEditorForm as WaveEditorForm } from "./WaveEditorForm";

const volumeOptions = [
  {
    value: "0",
    label: "Mute"
  },
  {
    value: "1",
    label: "100%"
  },
  {
    value: "2",
    label: "50%"
  },
  {
    value: "3",
    label: "25%"
  }
];

interface InstrumentWaveEditorProps {
  id: string;
  instrument?: WaveInstrument
}

export const InstrumentWaveEditor = ({
  instrument
}: InstrumentWaveEditorProps) => {
  const dispatch = useDispatch();

  if (!instrument) return <></>;

  const selectedVolume = volumeOptions.find((i) => parseInt(i.value, 10) === instrument.volume);

  const onChangeField = <T extends keyof WaveInstrument>(key: T) => (
    editValue: WaveInstrument[T]
  ) => {
    dispatch(
      trackerActions.editWaveInstrument({
        instrumentId: instrument.index,
        changes: {
          [key]: editValue,
        },
      })
    );
  };

  const onChangeFieldSelect = <T extends keyof WaveInstrument>(key: T) => (
    e: { value: string, label: string }
  ) => {
    const editValue = e.value;
    dispatch(
      trackerActions.editWaveInstrument({
        instrumentId: instrument.index,
        changes: {
          [key]: editValue,
        },
      })
    );
  };

  return (
    <>
      <InstrumentLengthForm
        value={instrument.length || 0}
        onChange={onChangeField("length")}
      />

      <FormDivider/>

      <FormRow>
        <FormField
          name="volume"
          label={l10n("FIELD_VOLUME")}
        >
          <Select
            name="volume"
            value={selectedVolume}
            options={volumeOptions}
            onChange={onChangeFieldSelect("volume")}
          />
        </FormField>
      </FormRow>

      <WaveEditorForm
        waveId={instrument.wave_index}
        onChange={onChangeFieldSelect("wave_index")}
      />

    </>
  );
}