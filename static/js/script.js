$(function(){
  $.fn.extend({
    countdown: function(props){
      props = jQuery.extend({ //Default props
        until: new Date(),
      }, props);
      const state = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
      let render = (props) => {
        const { days, hours, minutes, seconds } = props;
        this.empty();
        this.append(`
        <div  class="countdownProp" date-count="${days == 1 ? '天' : '天'}">${days}</div>
        <div class="countdownProp" date-count="${hours == 1 ? '时' : '时'}">${hours < 10 ? '0' + hours : hours}</div>
        <div class="countdownProp" date-count="${minutes == 1 ? '分' : '分'}">${minutes < 10 ? '0' + minutes : minutes}</div>
        <div class="countdownProp" date-count="${seconds == 1 ? '秒' : '秒'}">${seconds < 10 ? '0' + seconds : seconds}</div>
      
        `);

      }
      render(state);
      let update = setInterval(function(){
        let counter = props.until - (new Date().getTime());
        if (counter <= 0) {
          clearInterval(update);
          return false;
        }
        state.days = Math.floor(counter / (1000 * 60 * 60 * 24));
        state.hours = Math.floor((counter % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        state.minutes = Math.floor((counter % (1000 * 60 * 60)) / (1000 * 60));
        state.seconds = Math.floor((counter % (1000 * 60)) / 1000);
        render(state);
      }, 1000);
      return this;
    },
    snow: function(props){
      props = jQuery.extend({ //Default props
        amount: 60
      }, props);
      let random = (min, max) => {
        return Math.random() * (max - min) + min;
      }
      let svg = '<svg class="snow" xmlns="http://www.w3.org/2000/svg">';
      for (let index = 0; index < props.amount; index++) {
        svg += `<circle class="particle" r="${random(1, 3)}" cx="${random(1, 100)}%" cy="-${random(1, 100)}" />`;
      }
      svg += '</svg>';
      this.replaceWith(svg);
    }
  })

  $('.countdown').countdown({
    until: new Date(2026, 0, 1) // 使用月份的数字表示
  })
  $('.snow').snow({
    amount: 100 //Number of particles
  });
});
