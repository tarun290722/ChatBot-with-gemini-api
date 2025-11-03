const promptInp = document.getElementById("prompt");
const chatContainer = document.querySelector(".chat-box");
const APIkey = "You'r API Key";
const ApiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${APIkey}`;
const sendBtn=document.querySelector("#sendBtn");
let user = {
  data: null,
  file: null,
};

async function generateResponse(newChild) {
  const bubbleAi = document.querySelector(".bubbleAi");
  let RequestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": APIkey },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: user.data }],
        },
      ],
    }),
  };

  try {
    let response = await fetch(ApiURL, RequestOption);
    let data = await response.json();
    const aiResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim() || "No response";
    console.log(aiResponse);
    // handleChatAiResponse(aiResponse);
    newChild.children[1].innerHTML = `<span>${aiResponse}</span>`;
  } catch (err) {
    // handleChatAiResponse("Something went wrong!");
    // bubbleAi.innerHTML = ;
    newChild.children[1].innerHTML = `<span>Something went wrong!</span>`
  }
}

function handleChatAiResponse(message = "") {
  const newChild = document.createElement("div");
  newChild.classList.add("message", "bot");
  newChild.innerHTML = `  <img
            src="images/ai.png
              "
            alt=""
            id="aiImg"
          />
          <div class="bubble bubbleAi"><img src="images/1484.gif" alt="" width="25px" height="15px" style="object-fit:cover"></img></div>`;

  chatContainer.append(newChild);
  console.log(newChild);
  
  return newChild;
}

const handleChatResponse = (message, classArr) => {
  const newChild = document.createElement("div");
  newChild.classList.add("message", "user");
  newChild.classList.contains("user");
  newChild.innerHTML = `<div class="bubble" id="userInp">${user.data}</div>
          <img src="images/userImg.png" alt="" id="userImg" />`;
  chatContainer.append(newChild);
};

sendBtn.addEventListener("click",(e)=>{
  if(promptInp.value!="")
  {
    user.data=promptInp.value;
    promptInp.value="";
     handleChatResponse(e.target.value);
    e.target.value = "";
    setTimeout(() => {
      let newChild=handleChatAiResponse(user.data);
      let responseFromApi = generateResponse(newChild);
    }, 600);
  }
})
promptInp.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    user.data = e.target.value;
    // console.log(e.target.value)
    handleChatResponse(e.target.value);
    e.target.value = "";
    setTimeout(() => {
      let newChild=handleChatAiResponse(user.data);
      let responseFromApi = generateResponse(newChild);
    }, 600);
  }
});
document.addEventListener('keydown',(e)=>{
if(e.key=="/")
{
  promptInp.focus();
}
// console.log(e);


})
