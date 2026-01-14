export function calculateAge(birthDateString) {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  
  let age = today.getFullYear() - birthDate.getFullYear();
  
  // Check if the birthday has occurred yet this year
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();
  
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  
  return age;
}

export function getMonthNumber(birthDateString) {
  return birthDateString.split("-")[1];
}

export function formatToYMD(dateValue) {
  const { year, month, day } = dateValue;

  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");

  return `${year}-${mm}-${dd}`;
}

export function formatDateTimeID(isoString) {
  const date = new Date(isoString);

  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// "05 Januari 2026 12.49"



export const genders = [
  {key:"pria", label: "Pria"},
  {key:"wanita", label: "Wanita"},
];