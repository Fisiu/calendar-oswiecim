(function(document, window, $, moment) {
  $(document).ready(function() {
    var cache = {};

    var calendar = $('#calendar');

    function mapCalendarData(data) {
      return $.map(data, function(item){
        var on = moment.parseZone(item.fields.start_time); // start moment
        var off = moment.parseZone(item.fields.end_time); // stop moment
        var diff = moment.duration(moment(off).diff(on)).asHours(); // event duration
        var cls = '';

        return {
          title: item.fields.title,
          start: on,
          end: diff > 23 ? off.add(24, 'h')  : off, // add one day, see: https://code.google.com/p/fullcalendar/issues/detail?id=689
          id: item.pk,
          allDay: diff > 23 ? true : false, // if > 23 assume it's allDay event
          className: diff > 23 ? 'fc-allday' : '', // add class when allDay event
        };
      });
    }
    function updateCalendar(date) {
      var cacheKey = date.format('MM-YYYY');
      var cacheItem = cache[cacheKey];
      if (!cacheItem) {
        cache[cacheKey] = [];
        $.getJSON('json/', {
          year: date.format('YYYY'),
          month: date.format('MM')
        }).done(function(fullCalendarData) {
          var mapped = mapCalendarData(fullCalendarData);
          console.log(mapped);
          cache[cacheKey] = mapped;
          calendar.fullCalendar('addEventSource', mapped);
        });
      }
    }

    function initCalendar() {
      var currentDate = moment();
      var cacheKey = currentDate.format('MM-YYYY');
      calendar.fullCalendar({
        header: {
          left: 'today',
          center: 'prev, title, next',
          right: 'month, basicWeek, agendaDay'
        },
        views: {
            agenda: {
                minTime: '06:00:00',
                maxTime: '22:00:00',
            },
        },
        defaultDate: currentDate,
        timezone: 'local',
        timeFormat: 'H:mm',
        editable: false,
        eventLimit: true,
        nextDayThreshold: '00:00:00',
        eventClick: function(eventObj) {
          document.location = window.location + eventObj._id;
        },
        viewRender: function(view) {
          updateCalendar(view.intervalStart);
        }
      });
    }
    initCalendar();
  });
})(document, window, jQuery, moment);
