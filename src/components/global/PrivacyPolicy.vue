<template>
  <ion-modal>
    <ion-header>
      <ion-toolbar>
        <ion-title>Privacy Policy</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="$el.dismiss()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content">
      <div class="content">
        <p>
          This “Privacy Policy” describes the privacy practices of ZabanAsly
          mobile application, and any other website or mobile application that
          we own or control and which posts or links to this Privacy Policy, and
          the rights and choices available to individuals with respect to their
          information.
        </p>
        <h3>Personal Information We Collect</h3>
        <p>
          Personal information you provide to us through the Service or
          otherwise includes:
        </p>
        <ul>
          <li>
            <strong>Profile information, </strong>such as your email, profile
            display name, profile photo, bio, social media and website URL(s)
            and information that may be related to your profile, such as the
            number of followers you have, groups/circles you’ve joined on our
            Services.
          </li>
          <li>
            <strong>Content you choose to upload to the Service</strong>, such
            as text, comments, reviews, images, audio, and video, along with the
            metadata associated with the files you upload.
          </li>
          <li>
            <strong>Feedback or correspondence</strong>, such as information you
            provide when you contact us with questions, feedback, or otherwise
            correspond with us online.
          </li>
          <li>
            <strong>Transaction information</strong>, such as information about
            payments to and from you and other details of products or services
            you have purchased from us.
          </li>
          <li>
            <strong>Usage information</strong>, such as information about how
            you use the Service and interact with us, including your reading
            progression through books and content available via the Service,
            your “likes”, groups/circles you join, comments you made to books
            and content you view on the Service and users of the Service you
            “follow”.
          </li>
          <li>
            <strong>Marketing information</strong>, such as your preferences for
            receiving communications about our activities, events, and
            publications, and details about how you engage with our
            communications
          </li>
          <li>
            <strong>Other information</strong> that we may collect which is not
            specifically listed here, but which we will use in accordance with
            this Privacy Policy or as otherwise disclosed at the time of
            collection.
          </li>
        </ul>
        <h3>How We Use Your Personal Information</h3>
        <p>To operate the Service. We use your personal information to:</p>
        <ul>
          <li>provide, operate and improve the Service</li>
          <li>provide information about our products and services</li>
          <li>establish and maintain your user profile on the Service</li>
          <li>
            facilitate your to login to the Service via third-party identity and
            access management providers
          </li>
          <li>
            enable security features of the Service, such as by sending you
            security codes via email, and remembering devices from which you
            have previously logged in
          </li>
          <li>
            communicate with you about the Service, including by sending you
            announcements, push notifications, updates, security alerts, and
            support and administrative messages
          </li>
          <li>
            communicate with you about events or contests in which you
            participate
          </li>
          <li>
            understand your needs and interests, and personalize your experience
            with the Service and our communications
          </li>
          <li>provide support and maintenance for the Service</li>
          <li>to respond to your requests, questions and feedback</li>
        </ul>
        <br />
        <br />
      </div>
    </ion-content>
  </ion-modal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
} from "@ionic/vue";
import {
  logoGithub,
  logoInstagram,
  logoTwitter,
  mailOutline,
} from "ionicons/icons";

export default defineComponent({
  setup() {
    return {
      logoGithub,
      logoInstagram,
      logoTwitter,
      mailOutline,
      version: process.env.VUE_APP_VERSION,
    };
  },
  components: {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
  },
  methods: {
    async open() {
      await this.$el.present();
    },
  },
});
</script>
<style lang="scss" scoped>
.content {
  font-family: "Merriweather", serif;
  font-weight: 100;
  line-height: 1.5em;
  padding: 12px !important;
  text-indent: 6px;
}
ion-title {
  font-family: "Merriweather", serif;
  font-weight: 700;

}
</style>
