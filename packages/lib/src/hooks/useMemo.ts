import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  const memoizatedRef = useRef(null);
  if (memoizatedRef.current === null || !_equals(memoizatedRef.current.deps, _deps)) {
    memoizatedRef.current = { deps: _deps, result: factory() };
    return memoizatedRef.current.result;
  }

  if (_equals(memoizatedRef.current.deps, _deps) && _deps) {
    return memoizatedRef.current.result;
  }
}
