import { useGameStore } from '@/stores/GameStore';
import { usePlayersStore } from '@/stores/PlayersStore';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

export const useTimer = () => {
  const gameStore = useGameStore();
  const playersStore = usePlayersStore();

  const timeElapsed = ref(0);
  const timerInterval = ref<NodeJS.Timeout | undefined>(undefined);
  const timeLimit = ref(gameStore.timerConfig.seconds);
  
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
    if (!newPaused && timerEnabled) {
      startTimer();
      return;
    }

    clearInterval(timerInterval.value);
  });

  onMounted(() => {
    if (timerEnabled && !paused.value) {
      startTimer();
    }
  });

  onUnmounted(() => {
    clearInterval(timerInterval.value);
  });

  return { timeElapsed };
};
