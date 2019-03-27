<template>
  <div class="container-fluid">
    <div class="jumbotron mt-3 text-center">
      <h1>{{status}} - {{$i18n.t(`general.http.${status}.title`)}}</h1>
      <p class="lead">
        <strong class="font-weight-bold">{{$route.path}}</strong>
         - {{$i18n.t(`general.http.${status}.description`)}}</p>
      <router-link class="btn btn-lg btn-primary" :to="{ name: 'home'}">
        {{$i18n.t('general.back.home')}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    status: Number
  }
}
</script>
