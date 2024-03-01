import { useGameStore } from '@/stores/GameStore';
import { usePlayersStore } from '@/stores/PlayersStore';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

export const useTimer = () => {
  const gameStore = useGameStore();
  const playersStore = usePlayersStore();

  const timeElapsed = ref(0);
  const timerInterval = ref<NodeJS.Timeout | undefined>(undefined);
  const timeLimit = computed(() => gameStore.timerConfig.seconds);
  watch(timeLimit, () => {
    timeElapsed.value = 0;
  })
  
  const startTimer = () => {
    timerInterval.value = setInterval(() => {
      if (++timeElapsed.value === timeLimit.value) {
        clearInterval(timerInterval.value);
        gameStore.endTurn();
        timeElapsed.value = 0;
        startTimer();
      }
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerInterval.value);
  }

  const turn = computed(() => gameStore.turn);
  watch(turn, () => {
    timeElapsed.value = 0;
  });

  const playerScores = computed(() =>
    Object.values(playersStore.players).map(({ score }) => score)
  );
  watch(playerScores, () => {
    timeElapsed.value = 0;
  });

  const paused = computed(() => gameStore.timerConfig.paused);
  const timerEnabled = computed(() => gameStore.timerConfig.enabled);
  watch(paused, (newPaused) => {
    if (!newPaused && timerEnabled.value) {
      startTimer();
      return;
    }

    stopTimer();
  });

  onMounted(() => {
    if (timerEnabled.value && !paused.value) {
      startTimer();
    }
  });

  onUnmounted(() => {
    stopTimer();
  });

  return { timeElapsed };
};
