
/*
  Generate ContextMenu Template
 */

(function() {
  var sels;

  sels = {};

  atom.contextMenu.itemSets.map(function(d) {
    var data, sel;
    if (!sels[d.selector]) {
      sels[d.selector] = [];
    }
    sels[d.selector] = sels[d.selector].concat(d.items);
    data = "";
    for (sel in sels) {
      data += "  \"" + sel + "\":\n";
      sels[sel].map(function(d) {
        if (d.type === "separator") {
          return false;
        }
        return data += "    \"" + d.command + "\": \"" + d.label + "\"\n";
      });
    }
    return atom.clipboard.write(data);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvY3BsYXllci8uYXRvbS9wYWNrYWdlcy9zaW1wbGlmaWVkLWNoaW5lc2UtbWVudS9kZWYvbWVtby5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0FBQUE7QUFBQSxNQUFBOztFQUdBLElBQUEsR0FBTzs7RUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUExQixDQUE4QixTQUFDLENBQUQ7QUFDNUIsUUFBQTtJQUFBLElBQUEsQ0FBOEIsSUFBSyxDQUFBLENBQUMsQ0FBQyxRQUFGLENBQW5DO01BQUEsSUFBSyxDQUFBLENBQUMsQ0FBQyxRQUFGLENBQUwsR0FBbUIsR0FBbkI7O0lBQ0EsSUFBSyxDQUFBLENBQUMsQ0FBQyxRQUFGLENBQUwsR0FBbUIsSUFBSyxDQUFBLENBQUMsQ0FBQyxRQUFGLENBQVcsQ0FBQyxNQUFqQixDQUF3QixDQUFDLENBQUMsS0FBMUI7SUFFbkIsSUFBQSxHQUFPO0FBQ1AsU0FBQSxXQUFBO01BQ0UsSUFBQSxJQUFRLE1BQUEsR0FBUyxHQUFULEdBQWU7TUFDdkIsSUFBSyxDQUFBLEdBQUEsQ0FBSSxDQUFDLEdBQVYsQ0FBYyxTQUFDLENBQUQ7UUFDWixJQUFpQixDQUFDLENBQUMsSUFBRixLQUFVLFdBQTNCO0FBQUEsaUJBQU8sTUFBUDs7ZUFDQSxJQUFBLElBQVEsUUFBQSxHQUFXLENBQUMsQ0FBQyxPQUFiLEdBQXVCLFFBQXZCLEdBQWtDLENBQUMsQ0FBQyxLQUFwQyxHQUE0QztNQUZ4QyxDQUFkO0FBRkY7V0FNQSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQWYsQ0FBcUIsSUFBckI7RUFYNEIsQ0FBOUI7QUFKQSIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuICBHZW5lcmF0ZSBDb250ZXh0TWVudSBUZW1wbGF0ZVxuIyMjXG5zZWxzID0ge31cbmF0b20uY29udGV4dE1lbnUuaXRlbVNldHMubWFwIChkKSAtPlxuICBzZWxzW2Quc2VsZWN0b3JdID0gW10gIHVubGVzcyBzZWxzW2Quc2VsZWN0b3JdXG4gIHNlbHNbZC5zZWxlY3Rvcl0gPSBzZWxzW2Quc2VsZWN0b3JdLmNvbmNhdChkLml0ZW1zKVxuXG4gIGRhdGEgPSBcIlwiXG4gIGZvciBzZWwgb2Ygc2Vsc1xuICAgIGRhdGEgKz0gXCIgIFxcXCJcIiArIHNlbCArIFwiXFxcIjpcXG5cIlxuICAgIHNlbHNbc2VsXS5tYXAgKGQpIC0+XG4gICAgICByZXR1cm4gZmFsc2UgIGlmIGQudHlwZSBpcyBcInNlcGFyYXRvclwiXG4gICAgICBkYXRhICs9IFwiICAgIFxcXCJcIiArIGQuY29tbWFuZCArIFwiXFxcIjogXFxcIlwiICsgZC5sYWJlbCArIFwiXFxcIlxcblwiXG5cbiAgYXRvbS5jbGlwYm9hcmQud3JpdGUgZGF0YVxuIl19