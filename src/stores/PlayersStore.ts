import type { Players } from "@/types";
import { defineStore } from "pinia";

export const usePlayersStore = defineStore('players', {
    state: (): Players => ({})
})