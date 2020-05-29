/*  Introduction To How To Work With Standard Libraries In Deno */

// Importing Required Files And Packages Here.
import {dayOfYear ,currentDayOfYear} from  'https://deno.land/std/datetime/mod.ts';

console.log(dayOfYear(new Date('2020-5-20')));
console.log(currentDayOfYear());
