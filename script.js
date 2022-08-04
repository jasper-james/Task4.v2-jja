getPagination('#task-table');
function getPagination(table) {
  var lastPage = 1;
  $('#maxRows').on('change', function(evt) {
    lastPage = 1;
    $('.pagination').find('li').slice(1, -1).remove();
      var trnum = 0; 
      var maxRows = parseInt($(this).val()); 

      if (maxRows == 5000) {
        $('.pagination').hide();
      } else {
        $('.pagination').show();
      }

      var totalRows = $(table + ' tbody tr').length; 

      $(table + ' tr:gt(0)').each(function() {
        trnum++; 
        if (trnum > maxRows) {
          $(this).hide(); 
        }
        if (trnum <= maxRows) {
          $(this).show();
        } 
      }); 
      if (totalRows > maxRows) {
        var pagenum = Math.ceil(totalRows / maxRows); 
        for (var i = 1; i <= pagenum; ) {
          $('.pagination #prev').before(
            '<li data-page="' + i + '">\
							<span>' + i++ + '</span>\
						</li>'
          ).show();
        } 
      } 
      $('.pagination [data-page="1"]').addClass('active'); 
      $('.pagination li').on('click', function(evt) {
        
        evt.stopImmediatePropagation();
        evt.preventDefault();
        var pageNum = $(this).attr('data-page'); 

        var maxRows = parseInt($('#maxRows').val()); 

        if (pageNum == 'prev') {
          if (lastPage == 1) {
            return;
          }
          pageNum = --lastPage;
        }
        if (pageNum == 'next') {
          if (lastPage == $('.pagination li').length - 2) {
            return;
          }
          pageNum = ++lastPage;
        }

        lastPage = pageNum;
        var trIndex = 0; 
        $('.pagination li').removeClass('active'); 
        $('.pagination [data-page="' + lastPage + '"]').addClass('active'); 

	  	  limitPagging1();

        $(table + ' tr:gt(0)').each(function() {
          trIndex++; 

          if (trIndex > maxRows * pageNum || trIndex <= maxRows * pageNum - maxRows) {
            $(this).hide();
          } else {
            $(this).show();
          } 
        }); 
      }); 
	    limitPagging1();
    }).val(5).change();
}

function limitPagging1(){
	if($('.pagination li').length > 7 ){
			if( $('.pagination li.active').attr('data-page') <= 3 ){
			$('.pagination li:gt(5)').hide();
			$('.pagination li:lt(5)').show();
			$('.pagination [data-page="next"]').show();
		}if ($('.pagination li.active').attr('data-page') > 3){
			$('.pagination li:gt(0)').hide();
			$('.pagination [data-page="next"]').show();
			for( let i = ( parseInt($('.pagination li.active').attr('data-page'))  -2 )  ; i <= ( parseInt($('.pagination li.active').attr('data-page'))  + 2 ) ; i++ ){
				$('.pagination [data-page="'+i+'"]').show();

			}
		}
	}
}

cPrev = -1; 
function sortBy(c) {
    rows = document.getElementById("task-table").rows.length; 
    columns = document.getElementById("task-table").rows[0].cells.length; 
    
    arrTable = [...Array(rows)].map(e => Array(columns)); 

    for (ro=0; ro<rows; ro++) { 
        for (co=0; co<columns; co++) { 
            arrTable[ro][co] = document.getElementById("task-table").rows[ro].cells[co].innerHTML;
        }
    }

    th = arrTable.shift(); 
    
    if (c !== cPrev) { 
        arrTable.sort(
            function (a, b) {
                if (a[c] === b[c]) {
                    return 0;
                } else {
                    return (a[c] < b[c]) ? -1 : 1;
                }
            }
        );
    } else { 
        arrTable.reverse();
    }

    cPrev = c; 
    arrTable.unshift(th); 
    
    for (ro=0; ro<rows; ro++) {
        for (co=0; co<columns; co++) {
            document.getElementById("task-table").rows[ro].cells[co].innerHTML = arrTable[ro][co];
        }
    }
}

let show = element => {
  var x = document.getElementById("maxRows").value;
  var y = element.getAttribute('data-page');
  if (y == "prev"){
      var interest = $('ul#credit').find('li.active').data('page');
      if (x == 5) {
          if (interest == 2) {
              document.getElementById("showing-entries").innerHTML = "Showing 1 to 5 of 20 entries";
          } else if (interest == 3) {
              document.getElementById("showing-entries").innerHTML = "Showing 6 to 10 of 20 entries";
          } else if (interest == 4) {
              document.getElementById("showing-entries").innerHTML = "Showing 11 to 15 of 20 entries";
          } else if (interest == 5) {
              document.getElementById("showing-entries").innerHTML = "Showing 16 to 20 of 20 entries";
          }  
      } else if (x == 10) {
          if (interest == 2) {
              document.getElementById("showing-entries").innerHTML = "Showing 1 to 10 of 42 entries";
          }  else if (interest == 3) {
              document.getElementById("showing-entries").innerHTML = "Showing 11 to 20 of 42 entries";
          } else if (interest == 4) {
              document.getElementById("showing-entries").innerHTML = "Showing 21 to 30 of 42 entries";
          } else if (interest == 5) {
              document.getElementById("showing-entries").innerHTML = "Showing 31 to 40 of 42 entries";
          }
      }  else if (x == 15) {
          if (interest == 2) {
              document.getElementById("showing-entries").innerHTML = "Showing 1 to 15 of 42 entries";
          } else if (interest == 2) {
              document.getElementById("showing-entries").innerHTML = "Showing 16 to 30 of 42 entries";
          }
      }
  }

  if (y == "next"){
      var interest = $('ul#credit').find('li.active').data('page');
      if (x == 5) {
          if (interest == 1) {
              document.getElementById("showing-entries").innerHTML = "Showing 6 to 10 of 20 entries";
          } else if (interest == 2) {
              document.getElementById("showing-entries").innerHTML = "Showing 11 to 15 of 20 entries";
          } else if (interest == 3) {
              document.getElementById("showing-entries").innerHTML = "Showing 16 to 20 of 20 entries";
          } 
      } else if (x == 10) {
          if (interest == 1) {
              document.getElementById("showing-entries").innerHTML = "Showing 11 to 20 of 20 entries";
          } 
      }  else if (x == 15) {
          if (interest == 1) {
              document.getElementById("showing-entries").innerHTML = "Showing 16 to 20 of 20 entries";
          } 
      }
  }

  if (x == 5) {
      if (y == 1) {
          document.getElementById("showing-entries").innerHTML = "Showing 1 to 5 of 20 entries";
      } else if (y == 2) {
          document.getElementById("showing-entries").innerHTML = "Showing 6 to 10 of 20 entries";
      } else if (y == 3) {
          document.getElementById("showing-entries").innerHTML = "Showing 11 to 15 of 20 entries";
      } 
  } else if (x == 10) {
      if (y == 1) {
          document.getElementById("showing-entries").innerHTML = "Showing 1 to 10 of 20 entries";
      } else if (y == 2) {
          document.getElementById("showing-entries").innerHTML = "Showing 11 to 20 of 20 entries";
      }  
  } else if (x == 15) {
      if (y == 1) {
          document.getElementById("showing-entries").innerHTML = "Showing 1 to 15 of 20 entries";
      } else if (y == 2) {
          document.getElementById("showing-entries").innerHTML = "Showing 16 to 20 of 20 entries";
      }  
  } 
}

function myPage(){
  var x = document.getElementById("maxRows").value;
  if (x == 5000) {
      document.getElementById("showing-entries").innerHTML = "Showing All Entries";
  } else if (x == 5){
      document.getElementById("showing-entries").innerHTML = "Showing 1 to 5 of 42 entries";
  } else if (x == 10){
      document.getElementById("showing-entries").innerHTML = "Showing 1 to 10 of 42 entries";
  } else if (x == 15){
      document.getElementById("showing-entries").innerHTML = "Showing 1 to 15 of 42 entries";
  } 
}

function myView(){
    var y = document.getElementById("myDiv");
    var z = document.getElementById("myDiv1");
    var x = document.getElementById("viewDetails").value;
    if (x == "horizontal") {
        z.style.display = "block";
        y.style.display = "none";
    } else if (x == "vertical"){
        z.style.display = "none";
        y.style.display = "block";
    } 
}

function myFunction() {
  var input, filter, table, tr, td, i, txtValue, searchBy;
  searchBy = document.getElementById("searchBy").value;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("task-table");
  tr = table.getElementsByTagName("tr");
  table2 = document.getElementById("info");
  for (i = 0; i < tr.length; i++) {
    if (searchBy == "Year") {
        td = tr[i].getElementsByTagName("td")[0];
    } else if (searchBy == "Rank") {
        td = tr[i].getElementsByTagName("td")[1];
    } else if (searchBy == "Recipient") {
        td = tr[i].getElementsByTagName("td")[2];
    } else if (searchBy == "Country") {
        td = tr[i].getElementsByTagName("td")[3];
    } else if (searchBy == "Career") {
        td = tr[i].getElementsByTagName("td")[4];
    } else if (searchBy == "Tied") {
        td = tr[i].getElementsByTagName("td")[5];
    } else if (searchBy == "Title") {
        td = tr[i].getElementsByTagName("td")[6];
    } 
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

$(function() {
  $("td[colspan=8]").find("table").hide();
  $("button").click(function(event) {
      event.stopPropagation();
      var $target = $(event.target);
      if ( $target.closest("td").attr("colspan") > 1 ) {
          $target.slideUp();
      } else {
          $target.closest("tr").next().find("table").slideToggle();
      }                    
  });
});