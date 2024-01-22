import { onUnmounted, watch, type Ref } from 'vue';

export interface UseClickOutside {
  container: Ref<HTMLElement | null>;
  target: Ref<string>;
  callback: (e: MouseEvent) => void;
}

export const noTargetErrorMessage = 'A target classname has to be provided.';
export const noCallbackErrorMessage = 'A callback has to be provided.';

export const useClickOutside = ({ target, callback, container }: UseClickOutside): void => {
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

  watch(container, (newContainer, oldContainer) => {
    if (newContainer !== oldContainer) {
      oldContainer?.removeEventListener('click', listener);
      newContainer?.addEventListener('click', listener);
    }
  });

  onUnmounted(() => {    
    container.value?.removeEventListener('click', listener);
  });
};
