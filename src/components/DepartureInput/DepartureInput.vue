<template>
    <div class="inputcontainer">
        <input type="text" required class="inputcontainer__input" v-model="term" @focus="enableSuggestions" @blur="disableSuggestions" @input="getMatches" spellcheck="false"/>
        <div class="inputcontainer__bordercover"/>
        <div class="inputcontainer__labelholder">
            <span class="inputcontainer__label">Von</span>
        </div>
        <div class="inputcontainer__clearbutton" @click="clearInput"></div>
    </div>
    <div class="suggestioncontainer">
        <ul class="suggestioncontainer__suggestionlist"> 
            <li class="suggestioncontainer__suggestion" v-for="(match, index) in matches" :key="index" @click="chooseMatch(index)" v-html="getMatchText(index)"></li>
        </ul>
    </div>
</template>

<script src="./DepartureInput.js" />
<style src="./DepartureInput.css" />