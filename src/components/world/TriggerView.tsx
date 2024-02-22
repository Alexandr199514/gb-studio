import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import editorActions from "store/features/editor/editorActions";
import { triggerSelectors } from "store/features/entities/entitiesState";
import { MIDDLE_MOUSE } from "consts";
import { RootState } from "store/configureStore";
import styled, { css } from "styled-components";

interface TriggerViewProps {
  id: string;
  sceneId: string;
  editable?: boolean;
}

interface WrapperProps {
  x: number;
  y: number;
  width: number;
  height: number;
  selected?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: rgba(255, 120, 0, 0.5);
  outline: 1px solid rgba(255, 120, 0, 1);
  -webkit-transform: translate3d(0, 0, 0);
  left: ${(props) => props.x * 8}px;
  top: ${(props) => props.y * 8}px;
  width: ${(props) => props.width * 8}px;
  height: ${(props) => props.height * 8}px;

  ${(props) =>
    props.selected
      ? css`
          background-color: rgba(255, 199, 40, 0.9);
        `
      : ""}
`;

const TriggerView = ({ id, sceneId, editable }: TriggerViewProps) => {
  const dispatch = useDispatch();
  const trigger = useSelector((state: RootState) =>
    triggerSelectors.selectById(state, id)
  );
  const selected = useSelector(
    (state: RootState) =>
      state.editor.type === "trigger" &&
      state.editor.scene === sceneId &&
      state.editor.entityId === id
  );

  const onMouseUp = useCallback(() => {
    dispatch(editorActions.dragTriggerStop());
    window.removeEventListener("mouseup", onMouseUp);
  }, [dispatch]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (editable && e.nativeEvent.which !== MIDDLE_MOUSE) {
        dispatch(editorActions.dragTriggerStart({ sceneId, triggerId: id }));
        dispatch(editorActions.setTool({ tool: "select" }));
        window.addEventListener("mouseup", onMouseUp);
      }
    },
    [dispatch, editable, id, onMouseUp, sceneId]
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseUp]);

  if (!trigger) {
    return <></>;
  }

  return (
    <Wrapper
      x={trigger.x}
      y={trigger.y}
      width={Math.max(trigger.width, 1)}
      height={Math.max(trigger.height, 1)}
      selected={selected}
      onMouseDown={onMouseDown}
    />
  );
};

export default TriggerView;
