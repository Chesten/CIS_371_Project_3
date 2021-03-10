import axios, {AxiosResponse} from "axios";

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php";

interface Drink{
  name: string, 
  //ingredents: Array<string>,
  instructions: string, 
  img: {
      url: string
  }
}

function drawTable(data){
    console.log("getting here with data: ", data)

    let tableBody: HTMLTableSectionElement | null;
    tableBody = document.querySelector("#progOutput table > tbody");

    let oldRows: NodeListOf<HTMLTableRowElement> | undefined;
    oldRows = tableBody?.querySelectorAll("tr");
    if (oldRows) {
      for (let k = 0; k < oldRows?.length; k++) {
        const oldOne = oldRows[k];
        tableBody?.removeChild(oldOne);
      }
    }

    data.forEach(element => {
      //temp row
      var tempDataRow: HTMLTableRowElement = document.createElement("tr");
      
      var tempDataA:HTMLTableDataCellElement = document.createElement("td");
      tempDataA.innerText = element.name;
      var tempDataB:HTMLTableDataCellElement = document.createElement("td");
      tempDataB.innerText = element.instructions;
      var tempDataIMG:HTMLTableDataCellElement = document.createElement("td");
      tempDataIMG.innerHTML = `<img src="${element.img}" width="100" height="100">` ;

      //append the name, then weight
      tempDataRow.appendChild(tempDataA);
      tempDataRow.appendChild(tempDataB);
      tempDataRow.appendChild(tempDataIMG);
      //append row to content (row holds class)
      tableBody?.appendChild(tempDataRow);    
    });
}


//drink type
  let theInput: HTMLInputElement | null;
  let theButton: HTMLButtonElement | null;
  theInput = document.querySelector("#userInput > input[type=text]");
  theButton = document.querySelector("#userInput > button");
  
  theButton?.addEventListener("click", () => {
    const inputLen = theInput?.value.length ?? 0;
    if (inputLen > 0){
        console.log("You entered", theInput?.value);
        
        axios.get(URL, {
          params: {
           s: theInput?.value,
          },
          })        //end axios
          .then((r: AxiosResponse) => r.data)//end responce
            .then((drinks: any) => {
              if(drinks.drinks==null){
                console.log("no value found")
                document.getElementById("status")!.innerText = "failure";
                document.getElementById("status")!.style.color = "Red";
              }
              else{
                  //console.log(drinks.drinks[2]);
                  //console.log(typeof drinks);
                  document.getElementById("status")!.innerText = "success";
                  document.getElementById("status")!.style.color = "LimeGreen";
                  var useableData: Drink[] = [];
                  drinks.drinks.forEach(d => {
                    var tempD: Drink = {
                      name:  d.strDrink,
                      //ingredents: Array<string>,
                      instructions: d.strInstructions, 
                      img: d.strDrinkThumb
                    };
                    console.log("name: " + tempD.name)
                    useableData.push(tempD)
                  });
                  drawTable(useableData);
              }
               })//end data       
    }  
    else
      console.log("Please enter some text");
  });



  //first letter
  let baseInput: HTMLInputElement | null;
  let baseButton: HTMLButtonElement | null;
  baseInput = document.querySelector("#base > input[type=text]");
  baseButton = document.querySelector("#base > button");
  
  baseButton?.addEventListener("click", () => {
    const inputLen = baseInput?.value.length ?? 0;
    if (inputLen == 1){
      console.log("You entered base", baseInput?.value);
      
      axios.get(URL, {
        params: {
         f: baseInput?.value,
        },
        })        //end axios
        .then((r: AxiosResponse) => r.data)//end responce
          .then((drinks: any) => {
              console.log(drinks);
              //console.log(typeof drinks);
              if(drinks.drinks==null){
                console.log("no value found")
                document.getElementById("status")!.innerText = "failure";
                document.getElementById("status")!.style.color = "Red";
              }
              else{
                document.getElementById("status")!.innerText = "success";
                document.getElementById("status")!.style.color = "LimeGreen";
                var useableData: Drink[] = [];
                drinks.drinks.forEach(d => {
                  var tempD: Drink = {
                    name:  d.strDrink,
                    //ingredents: Array<string>,
                    instructions: d.strInstructions, 
                    img: d.strDrinkThumb
                  };
                  console.log("name: " + tempD.name)
                  useableData.push(tempD)
                });
                drawTable(useableData);
              }
             })//end data       
  }  
    else
      console.log("Please enter one text char in first letter box");
  });



