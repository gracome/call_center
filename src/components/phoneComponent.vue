<template>
  <div class="phone_class">
    <div class="mb-3" style="text-align: center; margin-top: 15px">
      <input
        id="dialText"
        type="number"
        class="dialTextInput border-bottom"
        v-model="inputValue"
        style="width: 170px; height: 32px"
      /><button
        id="dialDeleteKey"
        class="roundButtons"
        @click="deleteLastCharacter"
        v-if="inputValue"
        style="border: none; background: none; color: #2991cf"
      >
        ⌫
      </button>
    </div>
    <div class="mb-3">
      <table
        cellspacing="10"
        cellpadding="0"
        style="margin-left: auto; margin-right: auto"
      >
        <tbody>
          <tr>
            <td class="p-1">
              <button class="dialButtons" @click="handleButtonClick('1')">
                <div>1</div>
                <span>&nbsp;</span>
              </button>
            </td>
            <td class="p-1">
              <button class="dialButtons" @click="handleButtonClick('2')">
                <div>2</div>
                <span>ABC</span>
              </button>
            </td>
            <td class="p-1">
              <button class="dialButtons" @click="handleButtonClick('3')">
                <div>3</div>
                <span>DEF</span>
              </button>
            </td>
          </tr>
          <tr>
            <td class="p-1">
              <button class="dialButtons" @click="handleButtonClick('4')">
                <div>4</div>
                <span>GHI</span>
              </button>
            </td>
            <td class="p-1">
              <button class="dialButtons" @click="handleButtonClick('5')">
                <div>5</div>
                <span>JKL</span>
              </button>
            </td>
            <td class="p-1">
              <button class="dialButtons" @click="handleButtonClick('6')">
                <div>6</div>
                <span>MNO</span>
              </button>
            </td>
          </tr>
          <tr>
            <td class="p-1">
              <button class="dialButtons" @click="handleButtonClick('7')">
                <div>7</div>
                <span>PQRS</span>
              </button>
            </td>
            <td class="p-1">
              <button class="dialButtons" @click="handleButtonClick('8')">
                <div>8</div>
                <span>TUV</span>
              </button>
            </td>
            <td class="p-1">
              <button class="dialButtons" @click="handleButtonClick('9')">
                <div>9</div>
                <span>WXYZ</span>
              </button>
            </td>
          </tr>
          <tr>
            <td class="p-1">
              <button class="dialButtons" @click="handleButtonClick('*')">
                *
              </button>
            </td>
            <td class="p-1">
              <button class="dialButtons" @click="handleButtonClick('0')">
                0
              </button>
            </td>
            <td class="p-1">
              <button class="dialButtons" @click="handleButtonClick('#')">
                #
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="text-align: center; margin-bottom: 15px">
      <button
        class="dialButtons dialButtonsDial"
        id="dialAudio"
        title="Audio Call"
        @click="makeCall"
      >
        &#xf095;</button
      ><button
        class="dialButtons dialButtonsDial"
        id="dialVideo"
        style="margin-left: 20px"
        title="Video Call"
        onclick="DialByLine('video')"
      >
        &#xf095;
      </button>
    </div>
  </div>
</template>
<script>
import JsSIP from "jssip";

export default {
  data() {
    return {
      success: false,
      login: "",
      is_submitting: false,
      errorMessage: false,
      inputValue: "",
      destination: "",
     
    };
  },

  mounted() {
    // Configuration JsSIP (initiée une seule fois)
    var socket = new JsSIP.WebSocketInterface(
      "wss://intern-dev.kamgoko.com:8089/ws"
    );
    const configuration = {
      sockets: [socket],
      uri: "sip:207@intern-dev.kamgoko.com",
      password: "207Rich",
      ws_servers: 'wss://webrtc.registration.bandwidth.com:10443'
    };

    this.ua = new JsSIP.UA(configuration);
    this.ua.start();
  },
  methods: {
    handleButtonClick(value) {
      if (value === "del") {
        this.inputValue = this.inputValue.slice(0, -1);
      } else {
        this.inputValue += value;
      }
    },
    deleteLastCharacter() {
      this.inputValue = this.inputValue.slice(0, -1);
    },
    async makeCall() {
      if (!this.inputValue) {
        this.$notify({
          type: "error",
          text: "Veuillez entrer un numéro",
          duration: 5000,
        });
        return;
      }

      

      const session = this.ua.call(this.inputValue, {
        media: {
          constraints: {
            audio: true, // Activer la vidéo si nécessaire
          },
          render: {
            remote: document.getElementById("remoteAudio"), // Élément pour l'audio distant
            local: document.getElementById("localAudio"), // Élément pour l'audio local
          },
        },
      });

      session.on("connecting", () => {
        console.log("Connexion en cours...");
      });

      session.on("connected", () => {
        console.log("Appel connecté.");
      });

      session.on("ended", (data) => {
        if (data.cause === "Bye") {
          console.log("Appel terminé.");
        } else {
          console.log("Appel échoué:", data);
        }
      });

      session.on("failed", (data) => {
        console.log("Échec de l'appel:", data);
      });

      session.on("newDTMF", (data) => {
        console.log("Nouveau DTMF reçu:", data.dtmf);
      });
    },
  },
};
</script>