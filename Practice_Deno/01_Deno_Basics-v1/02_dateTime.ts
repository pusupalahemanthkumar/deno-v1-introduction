import {dayOfYear, currentDayOfYear} from "https://deno.land/std/datetime/mod.ts";

console.log(dayOfYear(new Date("2020-5-22")));
console.log(currentDayOfYear());