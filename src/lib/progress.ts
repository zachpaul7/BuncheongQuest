const KEY = 'bcq_progress';

export function getProgress(): boolean[] {
    if (typeof window === 'undefined') return Array(7).fill(false);
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return Array(7).fill(false);
        const arr = JSON.parse(raw) as boolean[];
        if (!Array.isArray(arr) || arr.length !== 7) return Array(7).fill(false);
        return arr.map(Boolean);
    } catch {
        return Array(7).fill(false);
    }
}

export function setCleared(index: number, value: boolean) {
    if (typeof window === 'undefined') return;
    const p = getProgress();
    p[index] = value;
    localStorage.setItem(KEY, JSON.stringify(p));
}

export function resetProgress() {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEY, JSON.stringify(Array(7).fill(false)));
}
