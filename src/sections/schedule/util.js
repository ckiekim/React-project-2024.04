// export 
function genTime() {
  const timeArray = [];
  for (let hour=0; hour<24; hour++)
    for (let min=0; min<60; min+=30) 
      timeArray.push(`${twoDigit(hour)}:${twoDigit(min)}`);
  return timeArray;
}

function twoDigit(num) {
  return num > 9 ? '' + num : '0' + num;
}

// console.log(genTime());

// export
function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();   // 날짜
  const date = "일 월 화 수 목 금 토".split(" ")[today.getDay()];   // 요일
  return {year, month, day, date};    
}

// const {year, month, day, date} = getToday();
// console.log(year, month, day, date);

// export
function getYearMonth(sessionYearMonth, arrow) {
  let {year, month} = getToday();
  if (sessionYearMonth) {
    year = parseInt(sessionYearMonth.substring(0, 4));
    month = parseInt(sessionYearMonth.substring(5));
  }
  if (arrow) {
    switch(arrow) {
      case "left":
				month -= 1;
				if (month === 0) { year -= 1; month = 12; }
				break;
			case "right":
				month += 1;
				if (month === 13) { year += 1; month = 1; }
				break;
			case "left2":
				year -= 1; 
        break;
			case "right2":
				year += 1; 
        break;
    }
  }

  return year + '.' + twoDigit(month);
}

// console.log(getYearMonth(null, null));
// console.log(getYearMonth('2024.03', 'left'));
// console.log(getYearMonth('2024.05', 'right2'));

// export 
function getCalendar(year, month) {
  const calendar = [];
  const startDay = new Date(year, month-1, 1);
  const startDate = startDay.getDay();
  const lastDay = new Date(year, month, 0);
  const lastDate = lastDay.getDay();

  // const prevSunDay = new Date(year, month-1, 1);
  // prevSunDay.setDate(prevSunDay.getDate() - startDate);
  // console.log(dateFormat(prevSunDay));
  
  // k는 날짜, i는 요일
  // 첫번째 주
  let week = [];
  if (startDate != 0) {   // 지난 달이 포함
    const prevSunDay = new Date(year, month-1, 1);
    prevSunDay.setDate(prevSunDay.getDate() - startDate);
    let prevDay  = prevSunDay.getDate();
    let prevMonth = prevSunDay.getMonth();
    let prevYear = prevSunDay.getFullYear();
    for (let i = 0; i < startDate; i++) {
      week.push(prevYear + twoDigit(prevMonth+1) + twoDigit(prevDay + i));
    }
  }
  for (let i = startDate, k = 1; i < 7; i++, k++) {   // 이번 달
    week.push(year + twoDigit(month) + twoDigit(k));
  }
  calendar.push(week);

  // 둘째 주부터 해당월의 마지막 날까지
  console.log(week);
}

function dateFormat(d) {
  return `${d.getFullYear()}${twoDigit(d.getMonth()+1)}${twoDigit(d.getDate())}`;
}

getCalendar(2024, 5);