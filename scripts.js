var keyArray = [];
var ideaArray= [];

// updatedKeyArray();
// onPageLoad();

/***Work to be***/

/***EVENT LISTENTERS**/
$('.save-idea').on('click', function () {
  debugger
  var $title = $('.title-storage').val();
  var $body = $('.body-storage').val();
  var $newIdea = new Idea($title, $body);
  clearInputFields();
  var tempArray = ideaArray.unshift($newIdea);
  var tempLocalStorage = JSON.stringify(tempArray);
  localStorage.setItem($newIdea.id, tempLocalStorage);
  // storeLocally($newIdea);
  prependIdea($newIdea);
});

$('.title-storage').on('input', enableSave);
$('.body-storage').on('input', enableSave);

$('.idea-container').on('click', '.upvote-icon', function () {
  var $qualityElement = $(this).parent().find('.quality-text');
  if ($qualityElement.text() === 'quality: swill') {
    $qualityElement.text('quality: plausible');
  } else if ($qualityElement.text() === 'quality: plausible') {
    $qualityElement.text('quality: genius');
  };
});

$('.idea-container').on('click', '.downvote-icon', function () {
  var $qualityElement = $(this).parent().find('.quality-text');
  if ($qualityElement.text() === 'quality: genius') {
    $qualityElement.text('quality: plausible');
  } else if ($qualityElement.text() === 'quality: plausible') {
    $qualityElement.text('quality: swill');
  };
});

$('.idea-container').on('click', '.delete-icon', function () {
  var ideaId = $(this).closest('.idea-card').attr('id');
  localStorage.removeItem(ideaId);
  $(this).closest('.idea-card').remove();
});


/***FUNCTIONS*/

function clearInputFields() {
  var $title = $('.title-storage');
  var $body = $('.body-storage');
  $title.val('');
  $body.val('');
  toggleDisabled($('.save-idea'), true);
  enableSave();
}


// function updatedKeyArray() {
//   for (var i = 0; i < localStorage.length; i++) {
//     var key = localStorage.key(i);
//     keyArray.push(key);
//   }
// }

// function onPageLoad() {
//   retrieveLocally();
// }
//
// function storeLocally(idea) {
//   var stringifiedIdea = JSON.stringify(idea);
//   localStorage.setItem(idea.id, stringifiedIdea);
// }
//
// function retrieveLocally() {
//   //create variable to store parsed Item from LS
//   var retrievedObject;
//   keyArray.forEach(function (key) {
//     retrievedObject = JSON.parse(localStorage.getItem(key));
//     prependIdea(retrievedObject);
//   });
// }


function enableSave() {
  var $title = $('.title-storage').val();
  var $body = $('.body-storage').val();
  if ($title !== '' && $body !== '') {
    toggleDisabled($('.save-idea'), false);
  } else {
    toggleDisabled($('.save-idea'), true);
  }
}



function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'quality: swill';
}

function prependIdea(newIdea) {
  var $title = newIdea.title;
  var $body = newIdea.body;
  var $quality = newIdea.quality;
  var $id = newIdea.id;
  $('.idea-container').prepend(
    `<article class="idea-card" id=
  ${newIdea.id}>
      <div class="card-header">
        <h2 contenteditable="true">${newIdea.title}</h2>
        <button class="delete-icon" type="button" name="delete-button"></button>
      </div>
      <p class="body-text" contenteditable="true">${newIdea.body}</p>
      <div class="quality-container">
        <button class="upvote-icon" type="button" name="upvote-btn"></button>
        <button class="downvote-icon" type="button" name="downvote-btn"></button>
        <p class="quality-text">${$quality}</p>
      </div>
    </article>`
  );
}

/***REFACTORED FUNCTIONS***/

$(document).ready(function() {
  console.log(ideaArray);
  ideaArray = readFromLocalStorage();
  // ideaArray.forEach(function(idea) {
  //   prependIdea(idea)
  // })
});

function toggleDisabled(element, value) {
  element.prop('disabled', value);
}

function writeToLocalStorage(ideaArray) {
  localStorage.setItem('ideaBoxArray', JSON.stringify(ideaArray));
}

function readFromLocalStorage() {
  debugger;
    return localStorage.getItem(JSON.parse('ideaBoxArray')) || [];
}
