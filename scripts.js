$(document).ready(function () {
  // Function to add a track to the table
  $("#track-form").submit(function (e) {
    e.preventDefault();

    // Retrieve form data
    var trackTitle = $("#trackTitle").val();
    var artistName = $("#artistName").val();
    var rating = parseInt($("#rating").val(), 10);

    createNewRow(trackTitle, artistName, rating);

    // Clear the form fields
    $("#track-form")[0].reset();
  });

  // Function to remove a track from the table
  $("#tracks-table").on("click", ".delete-btn", function () {
    $(this).closest("tr").remove();
  });

  // Function to sort the table columns
  $("#tracks-table thead th").click(function () {
    var sortButton = $(this).find(".sort-button");
    var table = $("#tracks-table");
    var rows = $("tbody > tr", table);
    var columnIndex = sortButton.closest("th").index();
    var order = sortButton.data("order");
    var newOrder = order === "desc" ? "asc" : "desc";

    // Reset all sort-buttons
    $(".sort-button")
      .not(sortButton)
      .removeClass("sort-desc sort-asc")
      .addClass("sort-inactive")
      .html("&#x25BC;") // Down arrow
      .data("order", "desc");

    // Toggle the state of this button
    if (newOrder === "asc") {
      sortButton
        .removeClass("sort-desc sort-inactive")
        .addClass("sort-asc")
        .html("&#x25B2;"); // Up arrow
    } else {
      sortButton
        .removeClass("sort-asc sort-inactive")
        .addClass("sort-desc")
        .html("&#x25BC;"); // Down arrow
    }
    sortButton.data("order", newOrder);

    rows.sort(function (a, b) {
      var A =
        $(a).children("td").eq(columnIndex).data("value") ||
        $(a).children("td").eq(columnIndex).text().toUpperCase();
      var B =
        $(b).children("td").eq(columnIndex).data("value") ||
        $(b).children("td").eq(columnIndex).text().toUpperCase();

      if (!isNaN(A) && !isNaN(B)) {
        // For numerical values
        return order === "asc" ? A - B : B - A;
      } else {
        // For non-numerical values
        return order === "asc" ? A.localeCompare(B) : B.localeCompare(A);
      }
    });

    $.each(rows, function (index, row) {
      table.children("tbody").append(row);
    });
  });
});

function createNewRow(trackTitle, artistName, rating) {
  // Create a new row in the table with this data
  var newRow = `<tr>
                    <td>${trackTitle}</td>
                    <td>${artistName}</td>
                    <td data-value="${rating}">${rating}</td>
                    <td><button type="button" class="btn btn-danger btn-sm delete-btn"><i class="fa fa-trash"></i></button></td>
                </tr>`;

  $("#tracks-table tbody").append(newRow);
}

// Created this for testing purposes
function fillTableWithSampleData() {
  // the ratings are random (maybe), don't get mad at us
  var sampleTracks = [
    { title: "Imagine", artist: "John Lennon", rating: 7 },
    { title: "Bohemian Rhapsody", artist: "Queen", rating: 10 },
    { title: "Stairway to Heaven", artist: "Led Zeppelin", rating: 8 },
    { title: "Hotel California", artist: "Eagles", rating: 6 },
    { title: "Sweet Child o' Mine", artist: "Guns N' Roses", rating: 8 },
    { title: "Hey Jude", artist: "The Beatles", rating: 7 },
    { title: "Smells Like Teen Spirit", artist: "Nirvana", rating: 9 },
    { title: "What's Going On", artist: "Marvin Gaye", rating: 7 },
    { title: "Shake It Off", artist: "Taylor Swift", rating: 5 },
    { title: "Rolling in the Deep", artist: "Adele", rating: 9 },
  ];

  sampleTracks.forEach(function (track, index) {
    setTimeout(function () {
      createNewRow(track.title, track.artist, track.rating);
    }, 250 * index); // Add a 250ms delay between each row to show the page expanding
  });
}
