/**
 * storage.ts
 * localStorage 기반 데이터 접근의 단일 진입점.
 * 컴포넌트에서 localStorage를 직접 호출하면 나중에 저장소를 바꿀 때
 * 모든 파일을 수정해야 하므로, 반드시 이 파일을 통해서만 접근한다.
 */

// ─────────────────────────────────────────────
// getItems
// ─────────────────────────────────────────────
/**
 * key에 해당하는 배열을 localStorage에서 읽어온다.
 * 파싱 실패나 데이터 없음을 빈 배열로 통일하는 이유:
 * 호출부에서 null 체크 없이 바로 .map(), .filter() 쓸 수 있도록.
 */
export function getItems<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return [];

    const parsed = JSON.parse(raw);

    // 배열이 아닌 값이 저장된 경우 (예: 이전 버전 데이터 충돌) 방어
    if (!Array.isArray(parsed)) {
      console.error(`[storage] "${key}" 값이 배열이 아닙니다. 빈 배열로 초기화합니다.`);
      return [];
    }

    return parsed as T[];
  } catch (error) {
    console.error(`[storage] getItems 실패 - key: "${key}"`, error);
    return [];
  }
}

// ─────────────────────────────────────────────
// setItems
// ─────────────────────────────────────────────
/**
 * 배열 전체를 key에 덮어쓴다.
 * boolean을 반환하는 이유: 저장 실패 시 호출부에서
 * "저장 안 됨" UI를 보여주는 등 후속 처리를 할 수 있도록.
 * QuotaExceededError는 localStorage 5MB 한도 초과 시 발생하는
 * 브라우저 표준 에러이므로 별도로 분기해 사용자에게 알린다.
 */
export function setItems<T>(key: string, items: T[]): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(items));
    return true;
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "QuotaExceededError"
    ) {
      console.error(`[storage] localStorage 용량 초과 - key: "${key}"`, error);
      alert(
        "저장 공간이 부족합니다 (5MB 한도 초과).\n" +
        "일부 데이터를 삭제한 후 다시 시도해주세요."
      );
      return false;
    }

    console.error(`[storage] setItems 실패 - key: "${key}"`, error);
    return false;
  }
}

// ─────────────────────────────────────────────
// addItem
// ─────────────────────────────────────────────
/**
 * 기존 배열 끝에 새 항목을 추가한다.
 * getItems로 먼저 읽는 이유: localStorage는 항상 최신 상태이므로
 * 메모리에 캐시된 값 대신 실제 저장된 값을 기준으로 추가해야
 * 다른 탭에서 수정한 내용과 충돌하지 않는다.
 */
export function addItem<T extends { id: string }>(key: string, item: T): void {
  try {
    const current = getItems<T>(key);
    current.push(item);
    setItems(key, current);
  } catch (error) {
    console.error(`[storage] addItem 실패 - key: "${key}", id: "${item.id}"`, error);
  }
}

// ─────────────────────────────────────────────
// removeItem
// ─────────────────────────────────────────────
/**
 * id가 일치하는 항목을 제거한다.
 * filter로 새 배열을 만드는 이유: 원본 배열을 직접 수정하면
 * React 상태와 연동될 때 리렌더링이 감지되지 않을 수 있어서.
 */
export function removeItem(key: string, id: string): void {
  try {
    const current = getItems<{ id: string }>(key);
    const next = current.filter((item) => item.id !== id);
    setItems(key, next);
  } catch (error) {
    console.error(`[storage] removeItem 실패 - key: "${key}", id: "${id}"`, error);
  }
}

// ─────────────────────────────────────────────
// updateItem
// ─────────────────────────────────────────────
/**
 * id가 일치하는 항목을 부분 업데이트한다.
 * Partial<T>를 쓰는 이유: 변경된 필드만 넘기면 되므로
 * 호출부 코드가 간결해지고, 실수로 필드를 빠뜨릴 위험이 줄어든다.
 * 스프레드 순서(item 먼저, patch 나중)가 중요한 이유:
 * 나중에 오는 값이 앞의 값을 덮어쓰므로 patch가 우선순위를 가진다.
 */
export function updateItem<T extends { id: string }>(
  key: string,
  id: string,
  patch: Partial<T>
): void {
  try {
    const current = getItems<T>(key);
    const next = current.map((item) =>
      item.id === id ? { ...item, ...patch } : item
    );
    setItems(key, next);
  } catch (error) {
    console.error(`[storage] updateItem 실패 - key: "${key}", id: "${id}"`, error);
  }
}