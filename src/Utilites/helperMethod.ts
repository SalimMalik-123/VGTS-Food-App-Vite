export const isValidEmail = (email:string):boolean => {
    // Define your Email validation regular expression
  // Adjust the regex according to your validation criteria
  return /\S+@\S+\.\S+/.test(email);
}


export const isValidPhoneNumber = (phoneNumber:string):boolean => {
  // Define your phone number validation regular expression
  // Adjust the regex according to your validation criteria
  return /^[0-9]{10}$/.test(phoneNumber);
};