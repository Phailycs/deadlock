<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-white">

    <!-- Image Valorant Randomizer en haut à gauche -->
    <div class="absolute mb-8 flex justify-center pb-80 ">
      <img src="../assets/img/valorant_randomizer.png" alt="Valorant Randomizer" class="img_valo" />
    </div>

    <div class="flex space-x-4 mt-8">
      <button @click="$router.push('/selectAgents')" class="call-to-action">
        <div>
            <div>
            RANDOMIZE AGENTS
            </div>
        </div>
      </button>
      <button @click="$router.push('/selectMoney')" class="call-to-action">
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
</style>
