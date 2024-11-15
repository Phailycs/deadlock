<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-white">

    <!-- Image Valorant Randomizer en haut à gauche -->
    <div class="absolute mb-8 flex justify-center pb-96 ">
      <img src="../assets/img/valorant_randomizer.svg" alt="Valorant Randomizer" class="img_valo" />
    </div>

    <div class="flex space-x-12 pb-2 pt-24">
      <button @click="$router.push('/selectAgents')" class="standard-button font-third-font font-bold">
        <div>
            <div>
            RANDOMIZE AGENTS
            </div>
        </div>
      </button>
      <button @click="$router.push('/selectMoney')" class="standard-button font-third-font font-bold">
        <div>
            <div>
            RANDOMIZE WEAPONS
            </div>
        </div>
      </button>
    </div>

  </div>
</template>

<style scoped>
.img_valo{
  width: 36rem;
}

/* Media query pour les dimensions 425 x 841 */
@media (max-width: 425px) and (max-height: 841px) {
  .img_valo {
    width: 17rem;
    margin-bottom: 2rem;
  }

  .flex {
    flex-direction: column;
    align-items: center;
  }
}
</style>
