import { onMounted, onUnmounted, type Ref } from 'vue';

export interface UseClickOutside {
  target: Ref<string>;
  callback: (e: MouseEvent) => void;
}

export const noTargetErrorMessage = 'A target classname has to be provided.';
export const noCallbackErrorMessage = 'A callback has to be provided.';

export const useClickOutside = ({ target, callback }: UseClickOutside): void => {
  if (!target) {
    throw new Error(noTargetErrorMessage);
  }

  if (!callback) {
    throw new Error(noCallbackErrorMessage);
  }

  const listener = (event: MouseEvent) => {
    const ancestors = event.composedPath() as HTMLElement[];
    const classNames: string[] = ancestors.reduce<string[]>((result, el) => {
      if (el.className) {
        result.push(el.className);
      }
      return result;
    }, []);
    if (classNames.includes(target.value)) {
      return;
    }

    callback(event);
  };

  onMounted(() => {
    document.addEventListener('click', listener);
  });

  onUnmounted(() => {
    document.removeEventListener('click', listener);
  });
};
