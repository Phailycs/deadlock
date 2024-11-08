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
      <button @click="randomizeWeapon" class="call-to-action">
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
body {
  font-family: Arial, sans-serif;
}

.call-to-action {
  height: 68px;
  background-color: transparent;
  border: none;
  position: relative;
  box-sizing: border-box;
  padding: 7px;
  cursor: pointer;
}

.call-to-action::before,
.call-to-action::after {
  content: "";
  position: absolute;
  border: 1px solid white;
  height: 30px;
  box-sizing: border-box;
  left: 0;
  right: 0;
}

.call-to-action::before {
  top: 0;
  border-bottom: none;
}

.call-to-action::after {
  bottom: 0;
  border-top: none;
}

.call-to-action > div {
  background-color: white;
  color: #0f1923;
  height: 100%;
  text-transform: uppercase;
  vertical-align: center;
  padding: 0 4em;
  font-weight: bold;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: color 0.3s ease;
}

.call-to-action > div > div {
  z-index: 1;
}

.call-to-action > div::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100px;
  background-color: red;
  transform: skew(-10deg);
  background-color: #2B2B2B;
  width: 120%;
  left: -130%;
  transition: left 0.3s ease;
}

.call-to-action > div::after {
  content: "";
  position: absolute;
  width: 4px;
  height: 4px;
  bottom: 0;
  right: 0;
  background-color: #0f1923;
  transition: background-color 0.3s ease;
}

.call-to-action:hover > div {
  color: white;
}

.call-to-action:hover > div::before {
  left: -10%;
}

.call-to-action:hover > div::after {
  background-color: white;
}

.img_valo{
  width: 36rem;
}

</style>
