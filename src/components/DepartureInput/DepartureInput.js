import axios from 'axios'

export default {
  name: 'Input',
  components: {},
  data() {
    return {
      matches: null,
      allMatches: null,
      term: ""
    };
  },
  methods: {

    async getMatches() {
      if (this.term === "") {
          this.matches = null;
          return;
      }

      const url = 'https://timetable.search.ch/api/completion.json?term=' + this.term;
      await axios.get(url)
      .then(data => this.allMatches = data.data)
      .catch(err => console.log(err));
      
      this.removeCommaAndUndefined();

      this.matches = this.allMatches;
    },

    getMatchText(x) {
      return this.matches[x].html + ', Schweiz';
    },

    clearInput() {
      this.matches = null;
      this.term = "";
    },

    chooseMatch(index) {
      this.term = this.matches[index].label;
      document.getElementsByClassName('inputcontainer__input')[0].blur();
    },

    removeCommaAndUndefined() {
      var x;
      for(x = 0; x < this.allMatches.length - 1; x++)
      {
        if (this.allMatches[x].html != undefined && this.allMatches[x].label != undefined) {
          this.allMatches[x].html = this.allMatches[x].html.replace(',', '');
          this.allMatches[x].label = this.allMatches[x].label.replace(',', ''); 
        } else {
          this.allMatches.splice(x, 1)
        }
      }
    },

    async enableSuggestions() {
      await this.getMatches()
      const suggestionsBox = document.getElementsByClassName('suggestioncontainer')[0];
      suggestionsBox.style.visibility = 'visible';
    },

    disableSuggestions() {
      const suggestionsBox = document.getElementsByClassName('suggestioncontainer')[0];
      setTimeout(function(){ suggestionsBox.style.visibility = 'hidden'; }, 1);
    }
  }
};

