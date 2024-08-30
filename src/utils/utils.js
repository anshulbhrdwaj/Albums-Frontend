import React from "react";

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${formattedHours}:${formattedMinutes} ${ampm} ${day}-${month}-${year}`;

  return formattedDate;
}

function getFileExtension(url) {
  return url?.split(".").pop().split(/\#|\?/)[0];
}

const videoExtensions = ["mp4", "webm", "ogg", "mov", "flv", "avi", "mkv"];

export function isVideoUrl(url) {
  const extension = getFileExtension(url);
  return videoExtensions.includes(extension?.toLowerCase());
}
