import { useState } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export const useShallowState = <T>(initialValue: Parameters<typeof useState<T>>[0]) => {
  // 1. useState 를 사용하여 실제 상태 관리.
  const [currentState, originSetState] = useState(initialValue);
  // 2. 반환할 originSetState 함수 정의.
  const customSetState = (newVal: unknown) => {
    // 새롭게 전달 받은 값을 계산. 함수인 경우를 고려하여 새로운 값을 도출
    const actualNewVal = typeof newVal === "function" ? newVal(currentState) : newVal;
    // 얕은 비교 사용하여 새로운 값과 현재 값을 비교 (상태 변경을 감지)
    if (!shallowEquals(actualNewVal, currentState)) {
      // 비교 값이 다르다면, origin 을 호출하여 상태 값 업데이트
      originSetState(actualNewVal);
    }
  };
  // 3. 매 랜더링 시 최신 함수를 할당.
  const customSetStateRef = useRef(customSetState);
  return [currentState, customSetStateRef.current];
};
