<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-white">

    <!-- Image Valorant Randomizer en haut à gauche -->
    <div class="container flex">
      <img src="../assets/img/valorant_randomizer.svg" alt="Valorant Randomizer" class="img_valo" />
    </div>

    <div class="container flex space-x-12">
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

/* mb-xs */
@media (min-width: 320px) {
  .img_valo {
    width: 17rem;
    
  }

  .flex {
    flex-direction: column;
    align-items: center;
  }
}

/* xs */
@media (min-width: 475px) {
  .img_valo {
    width: 17rem;
    margin-bottom: 2rem;
  }

  .flex {
    flex-direction: column;
    align-items: center;
  }
}

/* sm */
@media (min-width: 640px) {
  .img_valo {
    width: 17rem;
    margin-bottom: 2rem;
  }

  .flex {
    flex-direction: column;
    align-items: center;
  }
}

/* md */
@media (min-width: 768px) {
  .img_valo {
    width: 17rem;
    margin-bottom: 2rem;
  }

  .flex {
    flex-direction: column;
    align-items: center;
  }
}

/* lg */
@media (min-width: 1024px) {
  .img_valo {
    width: 17rem;
    margin-bottom: 2rem;
  }
}

/* xl */
@media (min-width: 1280px) {
  .img_valo{
  width: 36rem;
  }
}

/* 2xl */
@media (min-width: 1536px) {
  .img_valo{
  width: 36rem;
 }
}
</style>
