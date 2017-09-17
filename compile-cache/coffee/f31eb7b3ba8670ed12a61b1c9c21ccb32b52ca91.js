(function() {
  var ChineseSetting,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ChineseSetting = (function() {
    function ChineseSetting() {
      this.delay = bind(this.delay, this);
      this.M = require(__dirname + '/../def/menu_' + process.platform + '.json');
      this.C = require(__dirname + '/../def/context.json');
    }

    ChineseSetting.prototype.activate = function(state) {
      return setTimeout(this.delay, 0);
    };

    ChineseSetting.prototype.delay = function() {
      var config;
      config = atom.config.get('simplified-chinese-menu');
      if (config.useMenu) {
        this.updateMenu(atom.menu.template, this.M.Menu);
        atom.menu.update();
      }
      if (config.useContext) {
        this.updateContextMenu();
      }
      if (config.useSetting) {
        this.updateSettings();
        return atom.workspace.onDidChangeActivePaneItem((function(_this) {
          return function(item) {
            var chineseStatus, settingsTab;
            if (item && item.uri && item.uri.indexOf('atom://config') !== -1) {
              settingsTab = document.querySelector('.tab-bar [data-type="SettingsView"]');
              chineseStatus = settingsTab.getAttribute('inChinese');
              if (chineseStatus !== 'true') {
                settingsTab.setAttribute('inChinese', 'true');
                return _this.updateSettings(true);
              }
            }
          };
        })(this));
      }
    };

    ChineseSetting.prototype.updateMenu = function(menuList, def) {
      var i, key, len, menu, results, set;
      if (!def) {
        return;
      }
      results = [];
      for (i = 0, len = menuList.length; i < len; i++) {
        menu = menuList[i];
        if (!menu.label) {
          continue;
        }
        key = menu.label;
        if (key.indexOf('…' !== -1)) {
          key = key.replace('…', '...');
        }
        set = def[key];
        if (!set) {
          continue;
        }
        if (key === 'VERSION') {
          if (set != null) {
            menu.label = set.value + ' ' + atom.appVersion;
          }
        } else {
          if (set != null) {
            menu.label = set.value;
          }
        }
        if (menu.submenu != null) {
          results.push(this.updateMenu(menu.submenu, set.submenu));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    ChineseSetting.prototype.updateContextMenu = function() {
      var i, item, itemSet, label, len, ref, results, set;
      ref = atom.contextMenu.itemSets;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        itemSet = ref[i];
        set = this.C.Context[itemSet.selector];
        if (!set) {
          continue;
        }
        results.push((function() {
          var j, len1, ref1, results1;
          ref1 = itemSet.items;
          results1 = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            item = ref1[j];
            console.log(item);
            if (item.type === "separator") {
              continue;
            }
            label = set[item.command];
            if (label != null) {
              item.label = label;
            }
            results1.push(console.log(item));
          }
          return results1;
        })());
      }
      return results;
    };

    ChineseSetting.prototype.updateSettings = function(onSettingsOpen) {
      if (onSettingsOpen == null) {
        onSettingsOpen = false;
      }
      return setTimeout(this.delaySettings, 0, onSettingsOpen);
    };

    ChineseSetting.prototype.delaySettings = function(onSettingsOpen) {
      var settings;
      settings = require('./../tools/settings');
      return settings.init();
    };

    ChineseSetting.prototype.config = {
      useMenu: {
        title: '汉化菜单',
        description: '如果你不希望汉化`菜单`部分可以关闭此处,设置后可能需要重启 Atom。',
        type: 'boolean',
        "default": true
      },
      useSetting: {
        title: '汉化设置',
        description: '如果你不希望汉化`设置`部分可以关闭此处,设置后可能需要重启 Atom。',
        type: 'boolean',
        "default": true
      },
      useContext: {
        title: '汉化右键菜单',
        description: '如果你不希望汉化`右键菜单`部分可以关闭此处,设置后可能需要重启 Atom。',
        type: 'boolean',
        "default": true
      }
    };

    return ChineseSetting;

  })();

  module.exports = new ChineseSetting();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvY3BsYXllci8uYXRvbS9wYWNrYWdlcy9zaW1wbGlmaWVkLWNoaW5lc2UtbWVudS9saWIvbWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLGNBQUE7SUFBQTs7RUFBTTtJQUVTLHdCQUFBOztNQUVYLElBQUMsQ0FBQSxDQUFELEdBQUssT0FBQSxDQUFRLFNBQUEsR0FBWSxlQUFaLEdBQTRCLE9BQU8sQ0FBQyxRQUFwQyxHQUE2QyxPQUFyRDtNQUVMLElBQUMsQ0FBQSxDQUFELEdBQUssT0FBQSxDQUFRLFNBQUEsR0FBWSxzQkFBcEI7SUFKTTs7NkJBT2IsUUFBQSxHQUFVLFNBQUMsS0FBRDthQUNSLFVBQUEsQ0FBVyxJQUFDLENBQUEsS0FBWixFQUFrQixDQUFsQjtJQURROzs2QkFHVixLQUFBLEdBQU8sU0FBQTtBQUNMLFVBQUE7TUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHlCQUFoQjtNQUVULElBQUcsTUFBTSxDQUFDLE9BQVY7UUFFRSxJQUFDLENBQUEsVUFBRCxDQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBdEIsRUFBZ0MsSUFBQyxDQUFBLENBQUMsQ0FBQyxJQUFuQztRQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBVixDQUFBLEVBSEY7O01BS0EsSUFBRyxNQUFNLENBQUMsVUFBVjtRQUVFLElBQUMsQ0FBQSxpQkFBRCxDQUFBLEVBRkY7O01BSUEsSUFBRyxNQUFNLENBQUMsVUFBVjtRQUVFLElBQUMsQ0FBQSxjQUFELENBQUE7ZUFFQSxJQUFJLENBQUMsU0FBUyxDQUFDLHlCQUFmLENBQXlDLENBQUEsU0FBQSxLQUFBO2lCQUFBLFNBQUMsSUFBRDtBQUN2QyxnQkFBQTtZQUFBLElBQUcsSUFBQSxJQUFTLElBQUksQ0FBQyxHQUFkLElBQXNCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBVCxDQUFpQixlQUFq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QUFhLHdDQURiO1FBRUEsSUFBQSxFQUFNLFNBRk47UUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLElBSFQ7T0FYRjs7Ozs7OztFQWdCSixNQUFNLENBQUMsT0FBUCxHQUFxQixJQUFBLGNBQUEsQ0FBQTtBQXZGckIiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDaGluZXNlU2V0dGluZ1xuXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgICPoj5zljZVcbiAgICBATSA9IHJlcXVpcmUgX19kaXJuYW1lICsgJy8uLi9kZWYvbWVudV8nK3Byb2Nlc3MucGxhdGZvcm0rJy5qc29uJ1xuICAgICPlj7PplK7oj5zljZVcbiAgICBAQyA9IHJlcXVpcmUgX19kaXJuYW1lICsgJy8uLi9kZWYvY29udGV4dC5qc29uJ1xuXG5cbiAgYWN0aXZhdGU6IChzdGF0ZSkgLT5cbiAgICBzZXRUaW1lb3V0KEBkZWxheSwwKVxuXG4gIGRlbGF5OiAoKSA9PlxuICAgIGNvbmZpZyA9IGF0b20uY29uZmlnLmdldCAnc2ltcGxpZmllZC1jaGluZXNlLW1lbnUnXG5cbiAgICBpZiBjb25maWcudXNlTWVudVxuICAgICAgIyBNZW51XG4gICAgICBAdXBkYXRlTWVudShhdG9tLm1lbnUudGVtcGxhdGUsIEBNLk1lbnUpXG4gICAgICBhdG9tLm1lbnUudXBkYXRlKClcblxuICAgIGlmIGNvbmZpZy51c2VDb250ZXh0XG4gICAgICAjIENvbnRleHRNZW51XG4gICAgICBAdXBkYXRlQ29udGV4dE1lbnUoKVxuXG4gICAgaWYgY29uZmlnLnVzZVNldHRpbmdcbiAgICAgICMgU2V0dGluZ3MgKG9uIGluaXQgYW5kIG9wZW4pXG4gICAgICBAdXBkYXRlU2V0dGluZ3MoKVxuICAgICAgI+mHjei9veWQjuWIh+aNoui/h+adpeaXtlxuICAgICAgYXRvbS53b3Jrc3BhY2Uub25EaWRDaGFuZ2VBY3RpdmVQYW5lSXRlbSAoaXRlbSkgPT5cbiAgICAgICAgaWYgaXRlbSBhbmQgaXRlbS51cmkgYW5kIGl0ZW0udXJpLmluZGV4T2YoJ2F0b206Ly9jb25maWcnKSBpc250IC0xXG4gICAgICAgICAgc2V0dGluZ3NUYWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFiLWJhciBbZGF0YS10eXBlPVwiU2V0dGluZ3NWaWV3XCJdJylcbiAgICAgICAgICBjaGluZXNlU3RhdHVzID0gc2V0dGluZ3NUYWIuZ2V0QXR0cmlidXRlKCdpbkNoaW5lc2UnKVxuICAgICAgICAgIGlmIGNoaW5lc2VTdGF0dXMgaXNudCAndHJ1ZSdcbiAgICAgICAgICAgIHNldHRpbmdzVGFiLnNldEF0dHJpYnV0ZSgnaW5DaGluZXNlJywndHJ1ZScpXG4gICAgICAgICAgICBAdXBkYXRlU2V0dGluZ3ModHJ1ZSlcblxuICB1cGRhdGVNZW51IDogKG1lbnVMaXN0LCBkZWYpIC0+XG4gICAgcmV0dXJuIGlmIG5vdCBkZWZcbiAgICBmb3IgbWVudSBpbiBtZW51TGlzdFxuICAgICAgY29udGludWUgaWYgbm90IG1lbnUubGFiZWxcbiAgICAgIGtleSA9IG1lbnUubGFiZWxcbiAgICAgIGlmIGtleS5pbmRleE9mICfigKYnIGlzbnQgLTFcbiAgICAgICAga2V5ID0ga2V5LnJlcGxhY2UoJ+KApicsJy4uLicpXG4gICAgICBzZXQgPSBkZWZba2V5XVxuICAgICAgY29udGludWUgaWYgbm90IHNldFxuICAgICAgaWYga2V5IGlzICdWRVJTSU9OJ1xuICAgICAgICBtZW51LmxhYmVsID0gc2V0LnZhbHVlKycgJythdG9tLmFwcFZlcnNpb24gaWYgc2V0P1xuICAgICAgZWxzZVxuICAgICAgICBtZW51LmxhYmVsID0gc2V0LnZhbHVlIGlmIHNldD9cbiAgICAgIGlmIG1lbnUuc3VibWVudT9cbiAgICAgICAgQHVwZGF0ZU1lbnUobWVudS5zdWJtZW51LCBzZXQuc3VibWVudSlcblxuICB1cGRhdGVDb250ZXh0TWVudTogKCkgLT5cbiAgICBmb3IgaXRlbVNldCBpbiBhdG9tLmNvbnRleHRNZW51Lml0ZW1TZXRzXG4gICAgICBzZXQgPSBAQy5Db250ZXh0W2l0ZW1TZXQuc2VsZWN0b3JdXG4gICAgICBjb250aW51ZSBpZiBub3Qgc2V0XG4gICAgICBmb3IgaXRlbSBpbiBpdGVtU2V0Lml0ZW1zXG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW0pXG4gICAgICAgIGNvbnRpbnVlIGlmIGl0ZW0udHlwZSBpcyBcInNlcGFyYXRvclwiXG4gICAgICAgIGxhYmVsID0gc2V0W2l0ZW0uY29tbWFuZF1cbiAgICAgICAgaXRlbS5sYWJlbCA9IGxhYmVsIGlmIGxhYmVsP1xuICAgICAgICBjb25zb2xlLmxvZyhpdGVtKVxuXG4gIHVwZGF0ZVNldHRpbmdzOiAob25TZXR0aW5nc09wZW4gPSBmYWxzZSkgLT5cbiAgICBzZXRUaW1lb3V0KEBkZWxheVNldHRpbmdzLCAwLCBvblNldHRpbmdzT3BlbilcblxuICBkZWxheVNldHRpbmdzOiAob25TZXR0aW5nc09wZW4pIC0+XG4gICAgc2V0dGluZ3MgPSByZXF1aXJlICcuLy4uL3Rvb2xzL3NldHRpbmdzJ1xuICAgIHNldHRpbmdzLmluaXQoKVxuXG4gIGNvbmZpZzpcbiAgICB1c2VNZW51OlxuICAgICAgdGl0bGU6ICfmsYnljJboj5zljZUnXG4gICAgICBkZXNjcmlwdGlvbjogJ+WmguaenOS9oOS4jeW4jOacm+axieWMlmDoj5zljZVg6YOo5YiG5Y+v5Lul5YWz6Zet5q2k5aSELOiuvue9ruWQjuWPr+iDvemcgOimgemHjeWQryBBdG9t44CCJ1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgdXNlU2V0dGluZzpcbiAgICAgIHRpdGxlOiAn5rGJ5YyW6K6+572uJ1xuICAgICAgZGVzY3JpcHRpb246ICflpoLmnpzkvaDkuI3luIzmnJvmsYnljJZg6K6+572uYOmDqOWIhuWPr+S7peWFs+mXreatpOWkhCzorr7nva7lkI7lj6/og73pnIDopoHph43lkK8gQXRvbeOAgidcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIHVzZUNvbnRleHQ6XG4gICAgICB0aXRsZTogJ+axieWMluWPs+mUruiPnOWNlSdcbiAgICAgIGRlc2NyaXB0aW9uOiAn5aaC5p6c5L2g5LiN5biM5pyb5rGJ5YyWYOWPs+mUruiPnOWNlWDpg6jliIblj6/ku6XlhbPpl63mraTlpIQs6K6+572u5ZCO5Y+v6IO96ZyA6KaB6YeN5ZCvIEF0b23jgIInXG4gICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgIGRlZmF1bHQ6IHRydWVcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgQ2hpbmVzZVNldHRpbmcoKVxuIl19
