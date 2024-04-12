class PersianDate {
    constructor(
      cleanOutput = true,
      format = "24H",
      includeDate = true,
      includeTime = true
    ) {
      if (includeDate) {
        this.fullDate = this.covertToEnglishDigits(
          new Date().toLocaleString("fa-IR").split(",")[0].trim()
        );
  
        this.year = this.covertToEnglishDigits(this.fullDate.split("/")[0]);
  
        if (cleanOutput) {
          if (this.fullDate.split("/")[1].length == 1) {
            this.covertToEnglishDigits(
              (this.mounth = "0" + this.fullDate.split("/")[1])
            );
          } else {
            this.covertToEnglishDigits(
              (this.mounth = this.fullDate.split("/")[1])
            );
          }
          if (this.fullDate.split("/")[2].length == 1) {
            this.covertToEnglishDigits(
              (this.day = "0" + this.fullDate.split("/")[2])
            );
          } else {
            this.covertToEnglishDigits((this.day = this.fullDate.split("/")[2]));
          }
        } else {
          this.mounth = this.fullDate.split("/")[1];
          this.covertToEnglishDigits((this.day = this.fullDate.split("/")[2]));
        }
  
        this.note = "Current date values returned cause of parameters set!";
      }
      if (includeTime) {
        if (format == "24H") {
          this.fullTime = this.covertToEnglishDigits(
            new Date().toLocaleString("fa-IR").split(",")[1].trim()
          );
          this.hour = this.covertToEnglishDigits(this.fullTime.split(":")[0]);
          this.minute = this.covertToEnglishDigits(this.fullTime.split(":")[1]);
          this.second = this.covertToEnglishDigits(this.fullTime.split(":")[2]);
  
          this.note =
            "Current time values returned cause of parameters set! (24 Hour)";
        } else if (format == "12H") {
          let tmp;
  
          if (
            Number(new Date()
              .toLocaleString("fa-IR")
              .split(",")[1]
              .trim()
              .split(":")[0]) == 12
          ) {
            tmp = "24";
          } else {
            tmp = new Date()
              .toLocaleString("fa-IR")
              .split(",")[1]
              .trim()
              .split(":")[0];
          }
  
          this.fullTime = (
            +this.covertToEnglishDigits(tmp.toString()) -
            12 +
            ":" +
            this.covertToEnglishDigits(
              new Date()
                .toLocaleString("fa-IR")
                .split(",")[1]
                .trim()
                .split(":")[1]
            ) +
            ":" +
            this.covertToEnglishDigits(
              new Date()
                .toLocaleString("fa-IR")
                .split(",")[1]
                .trim()
                .split(":")[2]
            )
          ).toString();
          this.hour = this.fullTime.split(":")[0];
          this.minute = this.fullTime.split(":")[1];
          this.second = this.fullTime.split(":")[2];
  
          this.note =
            "Current time values returned cause of parameters set! (12 Hour)";
        } else {
                  
          this.fullDate = null;
          this.year = null;
          this.mounth = null;
          this.day = null;
          this.fullTime = null;
          this.hour = null;
          this.minute = null;
          this.second = null;
  
          this.note = "Invalid Time Format!";
          let err = new SyntaxError();
          err.message = "Invalid Time Format, Use one of '24H' or '12H'!";
          err.name = "PersianDate Syntax Unacceptable";
  
          throw err;
  
      }
      }
      if (!includeDate && !includeTime) {
        this.note = "No values returned cause of parameters set!";
      }
    }
  
    fullDateSignReplace(sign) {
      this.fullDate = this.fullDate.replaceAll(/["/"]/g, `${sign}`);
    }
  
    covertToEnglishDigits(argument) {
      return argument
        .replace(/[\u0660-\u0669]/g, function (c) {
          return c.charCodeAt(0) - 0x0660;
        })
        .replace(/[\u06f0-\u06f9]/g, function (c) {
          return c.charCodeAt(0) - 0x06f0;
        });
    }
  
    fullDate = null;
    year = null;
    mounth = null;
    day = null;
    fullTime = null;
    hour = null;
    minute = null;
    second = null;
    note = "All good!";
    
  }
  
  export default PersianDate;