const time = {
    dayOfWeek:   $(".dayOfWeek"),
    monthAndDay: $(".monthAndDay"),
    year:        $(".year")
}

const setDate = () => {
    var date = moment();
    let dayOfWeek   = date.format('ddd').toUpperCase();
    let monthAndDay = `${date.format('MMM').toUpperCase()} ${date.format('D')}`;
    let year        = date.format('YYYY');
    time.dayOfWeek.html(dayOfWeek);
    time.monthAndDay.html(monthAndDay);
    time.year.html(year);
}

setDate();