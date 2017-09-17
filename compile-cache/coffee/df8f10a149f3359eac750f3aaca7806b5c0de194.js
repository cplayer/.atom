(function() {
  var S, Settings, applyButtonToolbar, applyHtmlWithOrg, applyInstallPanelOnSwitch, applySectionHeadings, applySpecialHeading, applyTextContentBySettingsId, applyTextWithOrg, applyToPanel, getTextMatchElement, isAlreadyLocalized;

  S = require(__dirname + '/../def/settings.json');

  applyToPanel = function(e) {
    var d, i, info, inst, len, ref, span, sv, tc, tp1, tp2;
    ref = S.Settings.settings;
    for (i = 0, len = ref.length; i < len; i++) {
      d = ref[i];
      applyTextContentBySettingsId(d);
    }
    sv = document.querySelector('.settings-view');
    sv.querySelector('#core-settings-note').innerHTML = "下述为Atom核心部分的设置，个别扩展包可能拥有额外独立设置，浏览扩展包设置请在 <a class='link packages-open'>扩展包列表</a> 中选择对应名称扩展的设置。";
    sv.querySelector('#editor-settings-note').innerHTML = "下述为Atom文本编辑器部分的设置，其中一些设置将会基于每个语言覆盖，检查语言设置请在 <a class='link packages-open'>扩展包列表</a> 中选择对应语言扩展的设置。";
    info = sv.querySelector('.keybinding-panel>div:nth-child(2)');
    if (!isAlreadyLocalized(info)) {
      info.querySelector('span:nth-child(2)').textContent = "您可以覆盖这些按键绑定通过复制　";
      info.querySelector('span:nth-child(4)').textContent = "并且粘贴进";
      info.querySelector('a.link').textContent = " 用户键盘映射 ";
      span = document.createElement('span');
      span.textContent = "进行修改。";
      info.appendChild(span);
      info.setAttribute('data-localized', 'true');
    }
    info = sv.querySelector('.themes-panel>div>div:nth-child(2)');
    if (!isAlreadyLocalized(info)) {
      info.querySelector('span').textContent = "您也可以在";
      info.querySelector('a.link').textContent = " 用户样式设置 ";
      span = document.createElement('span');
      span.textContent = "中扩展 Atom 的样式。";
      info.appendChild(span);
      tp1 = sv.querySelector('.themes-picker>div:nth-child(1)');
      tp1.querySelector('.setting-title').textContent = "UI 主题";
      tp1.querySelector('.setting-description').textContent = "该主题将应用在标签，状态栏，树形视图和下拉菜单等。";
      tp2 = sv.querySelector('.themes-picker>div:nth-child(2)');
      tp2.querySelector('.setting-title').textContent = "语法主题";
      tp2.querySelector('.setting-description').textContent = "该主题将应用在编辑器内的文本。";
      info.setAttribute('data-localized', 'true');
    }
    applySpecialHeading(sv, "Available Updates", "可用更新");
    applyTextWithOrg(sv.querySelector('.update-all-button.btn-primary'), "全部更新");
    applyTextWithOrg(sv.querySelector('.update-all-button:not(.btn-primary)'), "检查更新");
    applyTextWithOrg(sv.querySelector('.alert.icon-hourglass'), "检查更新中...");
    applyTextWithOrg(sv.querySelector('.alert.icon-heart'), "已安装的扩展都是最新的!");
    applySectionHeadings();
    inst = document.querySelector('div.section:not(.themes-panel)');
    info = inst.querySelector('.native-key-bindings');
    if (!isAlreadyLocalized(info)) {
      info.querySelector('span:nth-child(2)').textContent = "扩展·主题 ";
      tc = info.querySelector('span:nth-child(4)');
      tc.textContent = tc.textContent.replace("and are installed to", "它们将被安装在 ");
      info.setAttribute('data-localized', 'true');
    }
    applyTextWithOrg(inst.querySelector('.search-container .btn:nth-child(1)'), "扩展");
    applyTextWithOrg(inst.querySelector('.search-container .btn:nth-child(2)'), "主题");
    return applyButtonToolbar();
  };

  applyInstallPanelOnSwitch = function() {
    var e, info, inst;
    try {
      applySectionHeadings(true);
      applyButtonToolbar();
      inst = document.querySelector('div.section:not(.themes-panel)');
      info = inst.querySelector('.native-key-bindings');
      return info.querySelector('span:nth-child(2)').textContent = "扩展·主题 ";
    } catch (error) {
      e = error;
      return console.log(e);
    }
  };

  applySpecialHeading = function(area, org, text) {
    var e, sh;
    try {
      sh = getTextMatchElement(area, '.section-heading', org);
      if (!(sh && !isAlreadyLocalized(sh))) {
        return;
      }
      return sh.textContent = text;
    } catch (error) {
      e = error;
      return console.log(e);
    }
  };

  applySectionHeadings = function(force) {
    var e, el, i, j, len, len1, ref, ref1, results, sh, sv;
    try {
      sv = document.querySelector('.settings-view');
      ref = S.Settings.sectionHeadings;
      for (i = 0, len = ref.length; i < len; i++) {
        sh = ref[i];
        el = getTextMatchElement(sv, '.section-heading', sh.label);
        if (!el) {
          continue;
        }
        if (!isAlreadyLocalized(el) && force) {
          applyTextWithOrg(el, sh.value);
        }
      }
      ref1 = S.Settings.subSectionHeadings;
      results = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        sh = ref1[j];
        el = getTextMatchElement(sv, '.sub-section-heading', sh.label);
        if (!el) {
          continue;
        }
        if (!isAlreadyLocalized(el) && force) {
          results.push(applyTextWithOrg(el, sh.value));
        } else {
          results.push(void 0);
        }
      }
      return results;
    } catch (error) {
      e = error;
      return console.log(e);
    }
  };

  applyButtonToolbar = function() {
    var btn, e, i, j, k, l, len, len1, len2, len3, len4, m, ref, ref1, ref2, ref3, ref4, results, sv;
    try {
      sv = document.querySelector('.settings-view');
      ref = sv.querySelectorAll('.meta-controls .install-button');
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        applyTextWithOrg(btn, "安装");
      }
      ref1 = sv.querySelectorAll('.meta-controls .settings');
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        btn = ref1[j];
        applyTextWithOrg(btn, "设置");
      }
      ref2 = sv.querySelectorAll('.meta-controls .uninstall-button');
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        btn = ref2[k];
        applyTextWithOrg(btn, "卸载");
      }
      ref3 = sv.querySelectorAll('.meta-controls .icon-playback-pause span');
      for (l = 0, len3 = ref3.length; l < len3; l++) {
        btn = ref3[l];
        applyTextWithOrg(btn, "关闭");
      }
      ref4 = sv.querySelectorAll('.meta-controls .icon-playback-play span');
      results = [];
      for (m = 0, len4 = ref4.length; m < len4; m++) {
        btn = ref4[m];
        results.push(applyTextWithOrg(btn, "启用"));
      }
      return results;
    } catch (error) {
      e = error;
      return console.log(e);
    }
  };

  getTextMatchElement = function(area, query, text) {
    var el, elems, i, len, result;
    elems = area.querySelectorAll(query);
    result;
    for (i = 0, len = elems.length; i < len; i++) {
      el = elems[i];
      if (el.textContent.includes(text)) {
        result = el;
        break;
      }
    }
    return result;
  };

  isAlreadyLocalized = function(elem) {
    var localized;
    if (elem) {
      localized = elem.getAttribute('data-localized');
    }
    return localized === 'true';
  };

  applyTextContentBySettingsId = function(data) {
    var before, ctrl, e, el, i, len, opt, options, results;
    try {
      el = document.querySelector("[id='" + data.id + "']");
      if (!el) {
        return;
      }
      ctrl = el.closest('.control-group');
      applyTextWithOrg(ctrl.querySelector('.setting-title'), data.title);
      applyHtmlWithOrg(ctrl.querySelector('.setting-description'), data.desc);
      if (data.selectOptions) {
        options = el.querySelectorAll('option');
        results = [];
        for (i = 0, len = options.length; i < len; i++) {
          opt = options[i];
          before = String(opt.textContent);
          results.push(applyTextWithOrg(opt, data.selectOptions[before].value));
        }
        return results;
      }
    } catch (error) {
      e = error;
      return console.log(e);
    }
  };

  applyTextWithOrg = function(elem, text) {
    var before, e;
    try {
      if (!text) {
        return;
      }
      before = String(elem.textContent);
      if (before === text) {
        return;
      }
      elem.textContent = text;
      elem.setAttribute('title', before);
      return elem.setAttribute('data-localized', 'true');
    } catch (error) {
      e = error;
      return console.log(e);
    }
  };

  applyHtmlWithOrg = function(elem, text) {
    var before, e;
    try {
      if (!text) {
        return;
      }
      before = String(elem.textContent);
      if (before === text) {
        return;
      }
      elem.innerHTML = text;
      elem.setAttribute('title', before);
      return elem.setAttribute('data-localized', 'true');
    } catch (error) {
      e = error;
      return console.log(e);
    }
  };

  Settings = {
    init: function() {
      var btn, btns, d, el, ext, font, i, j, k, lastMenu, len, len1, len2, menu, panelMenus, pm, ref, results, settingsEnabled, settingsTab, sv;
      settingsTab = document.querySelector('.tab-bar [data-type="SettingsView"]');
      if (settingsTab) {
        settingsEnabled = settingsTab.className.includes('active');
      }
      if (!(settingsTab && settingsEnabled)) {
        return;
      }
      sv = document.querySelector('.settings-view');
      if (process.platform === 'win32') {
        font = atom.config.get('editor.fontFamily');
        if (font) {
          sv.style["fontFamily"] = font;
        } else {
          sv.style["fontFamily"] = "'Segoe UI', Microsoft Yahei, sans-serif";
          sv.style["fontSize"] = "12px";
        }
      }
      lastMenu = sv.querySelector('.panels-menu .active a');
      panelMenus = sv.querySelectorAll('.settings-view .panels-menu li a');
      for (i = 0, len = panelMenus.length; i < len; i++) {
        pm = panelMenus[i];
        pm.click();
        pm.addEventListener('click', applyInstallPanelOnSwitch);
      }
      if (lastMenu) {
        lastMenu.click();
      }
      applyToPanel();
      menu = sv.querySelector('.settings-view .panels-menu');
      if (!menu) {
        return;
      }
      ref = S.Settings.menu;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        d = ref[j];
        el = menu.querySelector("[name='" + d.label + "']>a");
        applyTextWithOrg(el, d.value);
      }
      ext = sv.querySelector('.settings-view .icon-link-external');
      applyTextWithOrg(ext, "打开插件源码目录");
      btns = sv.querySelectorAll('div.section:not(.themes-panel) .search-container .btn');
      results = [];
      for (k = 0, len2 = btns.length; k < len2; k++) {
        btn = btns[k];
        results.push(btn.addEventListener('click', applyInstallPanelOnSwitch));
      }
      return results;
    }
  };

  module.exports = Settings;

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvY3BsYXllci8uYXRvbS9wYWNrYWdlcy9zaW1wbGlmaWVkLWNoaW5lc2UtbWVudS90b29scy9zZXR0aW5ncy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7QUFBQSxNQUFBOztFQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsU0FBQSxHQUFZLHVCQUFwQjs7RUFFSixZQUFBLEdBQWUsU0FBQyxDQUFEO0FBRWIsUUFBQTtBQUFBO0FBQUEsU0FBQSxxQ0FBQTs7TUFDRSw0QkFBQSxDQUE2QixDQUE3QjtBQURGO0lBR0EsRUFBQSxHQUFLLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QjtJQUVMLEVBQUUsQ0FBQyxhQUFILENBQWlCLHFCQUFqQixDQUF1QyxDQUFDLFNBQXhDLEdBQW9EO0lBQ3BELEVBQUUsQ0FBQyxhQUFILENBQWlCLHVCQUFqQixDQUF5QyxDQUFDLFNBQTFDLEdBQXNEO0lBSXRELElBQUEsR0FBTyxFQUFFLENBQUMsYUFBSCxDQUFpQixvQ0FBakI7SUFDUCxJQUFBLENBQU8sa0JBQUEsQ0FBbUIsSUFBbkIsQ0FBUDtNQUNFLElBQUksQ0FBQyxhQUFMLENBQW1CLG1CQUFuQixDQUF1QyxDQUFDLFdBQXhDLEdBQXNEO01BQ3RELElBQUksQ0FBQyxhQUFMLENBQW1CLG1CQUFuQixDQUF1QyxDQUFDLFdBQXhDLEdBQXNEO01BQ3RELElBQUksQ0FBQyxhQUFMLENBQW1CLFFBQW5CLENBQTRCLENBQUMsV0FBN0IsR0FBMkM7TUFDM0MsSUFBQSxHQUFPLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCO01BQ1AsSUFBSSxDQUFDLFdBQUwsR0FBbUI7TUFDbkIsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsSUFBakI7TUFDQSxJQUFJLENBQUMsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0MsTUFBcEMsRUFQRjs7SUFVQSxJQUFBLEdBQU8sRUFBRSxDQUFDLGFBQUgsQ0FBaUIsb0NBQWpCO0lB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Q0FBb0IsT0FBcEIsRUFBNkIseUJBQTdCO0FBRkY7TUFJQSxJQUFvQixRQUFwQjtRQUFBLFFBQVEsQ0FBQyxLQUFULENBQUEsRUFBQTs7TUFHQSxZQUFBLENBQUE7TUFHQSxJQUFBLEdBQU8sRUFBRSxDQUFDLGFBQUgsQ0FBaUIsNkJBQWpCO01BQ1AsSUFBQSxDQUFjLElBQWQ7QUFBQSxlQUFBOztBQUNBO0FBQUEsV0FBQSx1Q0FBQTs7UUFDRSxFQUFBLEdBQUssSUFBSSxDQUFDLGFBQUwsQ0FBbUIsU0FBQSxHQUFVLENBQUMsQ0FBQyxLQUFaLEdBQWtCLE1BQXJDO1FBQ0wsZ0JBQUEsQ0FBaUIsRUFBakIsRUFBcUIsQ0FBQyxDQUFDLEtBQXZCO0FBRkY7TUFLQSxHQUFBLEdBQU0sRUFBRSxDQUFDLGFBQUgsQ0FBaUIsb0NBQWpCO01BQ04sZ0JBQUEsQ0FBaUIsR0FBakIsRUFBc0IsVUFBdEI7TUFHQSxJQUFBLEdBQU8sRUFBRSxDQUFDLGdCQUFILENBQW9CLHVEQUFwQjtBQUNQO1dBQUEsd0NBQUE7O3FCQUNFLEdBQUcsQ0FBQyxnQkFBSixDQUFxQixPQUFyQixFQUE4Qix5QkFBOUI7QUFERjs7SUEzQ0ssQ0FBUDs7O0VBaURGLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBM05qQiIsInNvdXJjZXNDb250ZW50IjpbIiPorr7nva5cblMgPSByZXF1aXJlIF9fZGlybmFtZSArICcvLi4vZGVmL3NldHRpbmdzLmpzb24nXG5cbmFwcGx5VG9QYW5lbCA9IChlKSAtPlxuICAjIFNldHRpbmdzIHBhbmVsXG4gIGZvciBkIGluIFMuU2V0dGluZ3Muc2V0dGluZ3NcbiAgICBhcHBseVRleHRDb250ZW50QnlTZXR0aW5nc0lkKGQpXG5cbiAgc3YgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MtdmlldycpXG5cbiAgc3YucXVlcnlTZWxlY3RvcignI2NvcmUtc2V0dGluZ3Mtbm90ZScpLmlubmVySFRNTCA9IFwi5LiL6L+w5Li6QXRvbeaguOW/g+mDqOWIhueahOiuvue9ru+8jOS4quWIq+aJqeWxleWMheWPr+iDveaLpeaciemineWklueLrOeri+iuvue9ru+8jOa1j+iniOaJqeWxleWMheiuvue9ruivt+WcqCA8YSBjbGFzcz0nbGluayBwYWNrYWdlcy1vcGVuJz7mianlsZXljIXliJfooag8L2E+IOS4remAieaLqeWvueW6lOWQjeensOaJqeWxleeahOiuvue9ruOAglwiXG4gIHN2LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0b3Itc2V0dGluZ3Mtbm90ZScpLmlubmVySFRNTCA9IFwi5LiL6L+w5Li6QXRvbeaWh+acrOe8lui+keWZqOmDqOWIhueahOiuvue9ru+8jOWFtuS4reS4gOS6m+iuvue9ruWwhuS8muWfuuS6juavj+S4quivreiogOimhueblu+8jOajgOafpeivreiogOiuvue9ruivt+WcqCA8YSBjbGFzcz0nbGluayBwYWNrYWdlcy1vcGVuJz7mianlsZXljIXliJfooag8L2E+IOS4remAieaLqeWvueW6lOivreiogOaJqeWxleeahOiuvue9ruOAglwiXG5cbiAgI3N2LnF1ZXJ5U2VsZWN0b3IoJ1t0aXRsZT1cIlN5c3RlbSBTZXR0aW5nc1wiXScpLmNsb3Nlc3QoJy5wYW5lbHMtaXRlbScpLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0JykuaW5uZXJIVE1MID0gXCLov5nkupvorr7nva7lj6/ku6XlsIZBdG9t6ZuG5oiQ5Yiw5L2g55qE5pON5L2c57O757uf5Lit44CCXCJcbiAgIyBLZXliaW5kaW5nc1xuICBpbmZvID0gc3YucXVlcnlTZWxlY3RvcignLmtleWJpbmRpbmctcGFuZWw+ZGl2Om50aC1jaGlsZCgyKScpXG4gIHVubGVzcyBpc0FscmVhZHlMb2NhbGl6ZWQoaW5mbylcbiAgICBpbmZvLnF1ZXJ5U2VsZWN0b3IoJ3NwYW46bnRoLWNoaWxkKDIpJykudGV4dENvbnRlbnQgPSBcIuaCqOWPr+S7peimhueblui/meS6m+aMiemUrue7keWumumAmui/h+WkjeWItuOAgFwiXG4gICAgaW5mby5xdWVyeVNlbGVjdG9yKCdzcGFuOm50aC1jaGlsZCg0KScpLnRleHRDb250ZW50ID0gXCLlubbkuJTnspjotLTov5tcIlxuICAgIGluZm8ucXVlcnlTZWxlY3RvcignYS5saW5rJykudGV4dENvbnRlbnQgPSBcIiDnlKjmiLfplK7nm5jmmKDlsIQgXCJcbiAgICBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgc3Bhbi50ZXh0Q29udGVudCA9IFwi6L+b6KGM5L+u5pS544CCXCJcbiAgICBpbmZvLmFwcGVuZENoaWxkKHNwYW4pXG4gICAgaW5mby5zZXRBdHRyaWJ1dGUoJ2RhdGEtbG9jYWxpemVkJywgJ3RydWUnKVxuXG4gICMgVGhlbWVzIHBhbmVsXG4gIGluZm8gPSBzdi5xdWVyeVNlbGVjdG9yKCcudGhlbWVzLXBhbmVsPmRpdj5kaXY6bnRoLWNoaWxkKDIpJylcbiAgdW5sZXNzIGlzQWxyZWFkeUxvY2FsaXplZChpbmZvKVxuICAgIGluZm8ucXVlcnlTZWxlY3Rvcignc3BhbicpLnRleHRDb250ZW50ID0gXCLmgqjkuZ/lj6/ku6XlnKhcIlxuICAgIGluZm8ucXVlcnlTZWxlY3RvcignYS5saW5rJykudGV4dENvbnRlbnQgPSBcIiDnlKjmiLfmoLflvI/orr7nva4gXCJcbiAgICBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgc3Bhbi50ZXh0Q29udGVudCA9IFwi5Lit5omp5bGVIEF0b20g55qE5qC35byP44CCXCJcbiAgICAjIGNvbnNvbGUubG9nIGluZm9cbiAgICBpbmZvLmFwcGVuZENoaWxkKHNwYW4pXG4gICAgdHAxID0gc3YucXVlcnlTZWxlY3RvcignLnRoZW1lcy1waWNrZXI+ZGl2Om50aC1jaGlsZCgxKScpXG4gICAgdHAxLnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5nLXRpdGxlJykudGV4dENvbnRlbnQgPSBcIlVJIOS4u+mimFwiXG4gICAgdHAxLnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5nLWRlc2NyaXB0aW9uJykudGV4dENvbnRlbnQgPSBcIuivpeS4u+mimOWwhuW6lOeUqOWcqOagh+etvu+8jOeKtuaAgeagj++8jOagkeW9ouinhuWbvuWSjOS4i+aLieiPnOWNleetieOAglwiXG4gICAgdHAyID0gc3YucXVlcnlTZWxlY3RvcignLnRoZW1lcy1waWNrZXI+ZGl2Om50aC1jaGlsZCgyKScpXG4gICAgdHAyLnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5nLXRpdGxlJykudGV4dENvbnRlbnQgPSBcIuivreazleS4u+mimFwiXG4gICAgdHAyLnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5nLWRlc2NyaXB0aW9uJykudGV4dENvbnRlbnQgPSBcIuivpeS4u+mimOWwhuW6lOeUqOWcqOe8lui+keWZqOWGheeahOaWh+acrOOAglwiXG4gICAgaW5mby5zZXRBdHRyaWJ1dGUoJ2RhdGEtbG9jYWxpemVkJywgJ3RydWUnKVxuXG4gICMgVXBkYXRlcyBwYW5lbFxuICBhcHBseVNwZWNpYWxIZWFkaW5nKHN2LCBcIkF2YWlsYWJsZSBVcGRhdGVzXCIsIFwi5Y+v55So5pu05pawXCIpXG4gIGFwcGx5VGV4dFdpdGhPcmcoc3YucXVlcnlTZWxlY3RvcignLnVwZGF0ZS1hbGwtYnV0dG9uLmJ0bi1wcmltYXJ5JyksIFwi5YWo6YOo5pu05pawXCIpXG4gIGFwcGx5VGV4dFdpdGhPcmcoc3YucXVlcnlTZWxlY3RvcignLnVwZGF0ZS1hbGwtYnV0dG9uOm5vdCguYnRuLXByaW1hcnkpJyksIFwi5qOA5p+l5pu05pawXCIpXG4gIGFwcGx5VGV4dFdpdGhPcmcoc3YucXVlcnlTZWxlY3RvcignLmFsZXJ0Lmljb24taG91cmdsYXNzJyksIFwi5qOA5p+l5pu05paw5LitLi4uXCIpXG4gIGFwcGx5VGV4dFdpdGhPcmcoc3YucXVlcnlTZWxlY3RvcignLmFsZXJ0Lmljb24taGVhcnQnKSwgXCLlt7Llronoo4XnmoTmianlsZXpg73mmK/mnIDmlrDnmoQhXCIpXG5cbiAgIyBJbnN0YWxsIHBhbmVsXG4gIGFwcGx5U2VjdGlvbkhlYWRpbmdzKClcbiAgaW5zdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5zZWN0aW9uOm5vdCgudGhlbWVzLXBhbmVsKScpXG4gIGluZm8gPSBpbnN0LnF1ZXJ5U2VsZWN0b3IoJy5uYXRpdmUta2V5LWJpbmRpbmdzJylcbiAgdW5sZXNzIGlzQWxyZWFkeUxvY2FsaXplZChpbmZvKVxuICAgIGluZm8ucXVlcnlTZWxlY3Rvcignc3BhbjpudGgtY2hpbGQoMiknKS50ZXh0Q29udGVudCA9IFwi5omp5bGVwrfkuLvpopggXCJcbiAgICB0YyA9IGluZm8ucXVlcnlTZWxlY3Rvcignc3BhbjpudGgtY2hpbGQoNCknKVxuICAgIHRjLnRleHRDb250ZW50ID0gdGMudGV4dENvbnRlbnQucmVwbGFjZShcImFuZCBhcmUgaW5zdGFsbGVkIHRvXCIsIFwi5a6D5Lus5bCG6KKr5a6J6KOF5ZyoIFwiKVxuICAgICMgaW5mby5hcHBlbmRDaGlsZChzcGFuKVxuICAgIGluZm8uc2V0QXR0cmlidXRlKCdkYXRhLWxvY2FsaXplZCcsICd0cnVlJylcbiAgYXBwbHlUZXh0V2l0aE9yZyhpbnN0LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtY29udGFpbmVyIC5idG46bnRoLWNoaWxkKDEpJyksIFwi5omp5bGVXCIpXG4gIGFwcGx5VGV4dFdpdGhPcmcoaW5zdC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWNvbnRhaW5lciAuYnRuOm50aC1jaGlsZCgyKScpLCBcIuS4u+mimFwiKVxuXG4gICMgQnV0dG9uc1xuICBhcHBseUJ1dHRvblRvb2xiYXIoKVxuXG5hcHBseUluc3RhbGxQYW5lbE9uU3dpdGNoID0gKCkgLT5cbiAgdHJ5XG4gICAgYXBwbHlTZWN0aW9uSGVhZGluZ3ModHJ1ZSlcbiAgICBhcHBseUJ1dHRvblRvb2xiYXIoKVxuICAgIGluc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuc2VjdGlvbjpub3QoLnRoZW1lcy1wYW5lbCknKVxuICAgIGluZm8gPSBpbnN0LnF1ZXJ5U2VsZWN0b3IoJy5uYXRpdmUta2V5LWJpbmRpbmdzJylcbiAgICBpbmZvLnF1ZXJ5U2VsZWN0b3IoJ3NwYW46bnRoLWNoaWxkKDIpJykudGV4dENvbnRlbnQgPSBcIuaJqeWxlcK35Li76aKYIFwiXG4gIGNhdGNoIGVcbiAgICBjb25zb2xlLmxvZyBlXG5cbmFwcGx5U3BlY2lhbEhlYWRpbmcgPSAoYXJlYSwgb3JnLCB0ZXh0KSAtPlxuICB0cnlcbiAgICBzaCA9IGdldFRleHRNYXRjaEVsZW1lbnQoYXJlYSwgJy5zZWN0aW9uLWhlYWRpbmcnLCBvcmcpXG4gICAgcmV0dXJuIHVubGVzcyBzaCAmJiAhaXNBbHJlYWR5TG9jYWxpemVkKHNoKVxuICAgIHNoLnRleHRDb250ZW50ID0gdGV4dFxuICAgICMgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICMgc3Bhbi50ZXh0Q29udGVudCA9IG9yZ1xuICAgICMgYXBwbHlUZXh0V2l0aE9yZyhzcGFuLCB0ZXh0KVxuICAgICMgc2guYXBwZW5kQ2hpbGQoc3BhbilcbiAgY2F0Y2ggZVxuICAgIGNvbnNvbGUubG9nIGVcblxuYXBwbHlTZWN0aW9uSGVhZGluZ3MgPSAoZm9yY2UpIC0+XG4gIHRyeVxuICAgIHN2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzLXZpZXcnKVxuICAgIGZvciBzaCBpbiBTLlNldHRpbmdzLnNlY3Rpb25IZWFkaW5nc1xuICAgICAgZWwgPSBnZXRUZXh0TWF0Y2hFbGVtZW50KHN2LCAnLnNlY3Rpb24taGVhZGluZycsIHNoLmxhYmVsKVxuICAgICAgY29udGludWUgdW5sZXNzIGVsXG4gICAgICBpZiAhaXNBbHJlYWR5TG9jYWxpemVkKGVsKSBhbmQgZm9yY2VcbiAgICAgICAgYXBwbHlUZXh0V2l0aE9yZyhlbCwgc2gudmFsdWUpXG4gICAgZm9yIHNoIGluIFMuU2V0dGluZ3Muc3ViU2VjdGlvbkhlYWRpbmdzXG4gICAgICBlbCA9IGdldFRleHRNYXRjaEVsZW1lbnQoc3YsICcuc3ViLXNlY3Rpb24taGVhZGluZycsIHNoLmxhYmVsKVxuICAgICAgY29udGludWUgdW5sZXNzIGVsXG4gICAgICBpZiAhaXNBbHJlYWR5TG9jYWxpemVkKGVsKSBhbmQgZm9yY2VcbiAgICAgICAgYXBwbHlUZXh0V2l0aE9yZyhlbCwgc2gudmFsdWUpXG4gIGNhdGNoIGVcbiAgICBjb25zb2xlLmxvZyBlXG5cbmFwcGx5QnV0dG9uVG9vbGJhciA9ICgpIC0+XG4gIHRyeVxuICAgIHN2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzLXZpZXcnKVxuICAgIGZvciBidG4gaW4gc3YucXVlcnlTZWxlY3RvckFsbCgnLm1ldGEtY29udHJvbHMgLmluc3RhbGwtYnV0dG9uJylcbiAgICAgIGFwcGx5VGV4dFdpdGhPcmcoYnRuLCBcIuWuieijhVwiKVxuICAgIGZvciBidG4gaW4gc3YucXVlcnlTZWxlY3RvckFsbCgnLm1ldGEtY29udHJvbHMgLnNldHRpbmdzJylcbiAgICAgIGFwcGx5VGV4dFdpdGhPcmcoYnRuLCBcIuiuvue9rlwiKVxuICAgIGZvciBidG4gaW4gc3YucXVlcnlTZWxlY3RvckFsbCgnLm1ldGEtY29udHJvbHMgLnVuaW5zdGFsbC1idXR0b24nKVxuICAgICAgYXBwbHlUZXh0V2l0aE9yZyhidG4sIFwi5Y246L29XCIpXG4gICAgZm9yIGJ0biBpbiBzdi5xdWVyeVNlbGVjdG9yQWxsKCcubWV0YS1jb250cm9scyAuaWNvbi1wbGF5YmFjay1wYXVzZSBzcGFuJylcbiAgICAgIGFwcGx5VGV4dFdpdGhPcmcoYnRuLCBcIuWFs+mXrVwiKVxuICAgIGZvciBidG4gaW4gc3YucXVlcnlTZWxlY3RvckFsbCgnLm1ldGEtY29udHJvbHMgLmljb24tcGxheWJhY2stcGxheSBzcGFuJylcbiAgICAgIGFwcGx5VGV4dFdpdGhPcmcoYnRuLCBcIuWQr+eUqFwiKVxuICBjYXRjaCBlXG4gICAgY29uc29sZS5sb2cgZVxuXG5nZXRUZXh0TWF0Y2hFbGVtZW50ID0gKGFyZWEsIHF1ZXJ5LCB0ZXh0KSAtPlxuICBlbGVtcyA9IGFyZWEucXVlcnlTZWxlY3RvckFsbChxdWVyeSlcbiAgcmVzdWx0XG4gIGZvciBlbCBpbiBlbGVtc1xuICAgIGlmIGVsLnRleHRDb250ZW50LmluY2x1ZGVzKHRleHQpXG4gICAgICByZXN1bHQgPSBlbFxuICAgICAgYnJlYWtcbiAgcmV0dXJuIHJlc3VsdFxuXG5pc0FscmVhZHlMb2NhbGl6ZWQgPSAoZWxlbSkgLT5cbiAgbG9jYWxpemVkID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbG9jYWxpemVkJykgaWYgZWxlbVxuICByZXR1cm4gbG9jYWxpemVkIGlzICd0cnVlJ1xuXG5hcHBseVRleHRDb250ZW50QnlTZXR0aW5nc0lkID0gKGRhdGEpIC0+XG4gIHRyeVxuICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltpZD0nI3tkYXRhLmlkfSddXCIpXG4gICAgcmV0dXJuIHVubGVzcyBlbFxuICAgIGN0cmwgPSBlbC5jbG9zZXN0KCcuY29udHJvbC1ncm91cCcpXG4gICAgYXBwbHlUZXh0V2l0aE9yZyhjdHJsLnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5nLXRpdGxlJyksIGRhdGEudGl0bGUpXG4gICAgYXBwbHlIdG1sV2l0aE9yZyhjdHJsLnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5nLWRlc2NyaXB0aW9uJyksIGRhdGEuZGVzYylcbiAgICBpZiBkYXRhLnNlbGVjdE9wdGlvbnNcbiAgICAgIG9wdGlvbnMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKVxuICAgICAgZm9yIG9wdCBpbiBvcHRpb25zXG4gICAgICAgIGJlZm9yZSA9IFN0cmluZyhvcHQudGV4dENvbnRlbnQpXG4gICAgICAgIGFwcGx5VGV4dFdpdGhPcmcob3B0LCBkYXRhLnNlbGVjdE9wdGlvbnNbYmVmb3JlXS52YWx1ZSlcbiAgY2F0Y2ggZVxuICAgIGNvbnNvbGUubG9nIGVcblxuYXBwbHlUZXh0V2l0aE9yZyA9IChlbGVtLCB0ZXh0KSAtPlxuICB0cnlcbiAgICByZXR1cm4gdW5sZXNzIHRleHRcbiAgICBiZWZvcmUgPSBTdHJpbmcoZWxlbS50ZXh0Q29udGVudClcbiAgICByZXR1cm4gaWYgYmVmb3JlIGlzIHRleHRcbiAgICBlbGVtLnRleHRDb250ZW50ID0gdGV4dFxuICAgIGVsZW0uc2V0QXR0cmlidXRlKCd0aXRsZScsIGJlZm9yZSlcbiAgICBlbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1sb2NhbGl6ZWQnLCAndHJ1ZScpXG4gIGNhdGNoIGVcbiAgICBjb25zb2xlLmxvZyBlXG5cbmFwcGx5SHRtbFdpdGhPcmcgPSAoZWxlbSwgdGV4dCkgLT5cbiAgdHJ5XG4gICAgcmV0dXJuIHVubGVzcyB0ZXh0XG4gICAgYmVmb3JlID0gU3RyaW5nKGVsZW0udGV4dENvbnRlbnQpXG4gICAgcmV0dXJuIGlmIGJlZm9yZSBpcyB0ZXh0XG4gICAgZWxlbS5pbm5lckhUTUwgPSB0ZXh0XG4gICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgYmVmb3JlKVxuICAgIGVsZW0uc2V0QXR0cmlidXRlKCdkYXRhLWxvY2FsaXplZCcsICd0cnVlJylcbiAgY2F0Y2ggZVxuICAgIGNvbnNvbGUubG9nIGVcblxuXG5TZXR0aW5ncyA9XG4gIGluaXQgOiAoKSAtPlxuICAgIHNldHRpbmdzVGFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYi1iYXIgW2RhdGEtdHlwZT1cIlNldHRpbmdzVmlld1wiXScpXG4gICAgc2V0dGluZ3NFbmFibGVkID0gc2V0dGluZ3NUYWIuY2xhc3NOYW1lLmluY2x1ZGVzICdhY3RpdmUnIGlmIHNldHRpbmdzVGFiXG4gICAgcmV0dXJuIHVubGVzcyBzZXR0aW5nc1RhYiAmJiBzZXR0aW5nc0VuYWJsZWRcbiAgICAjdHJ5XG4gICAgIyBUYWIgdGl0bGVcbiAgICAjIHNldHRpbmdzVGFiLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZScpLnRleHRDb250ZW50ID0gXCLorr7nva5cIlxuICAgIHN2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzLXZpZXcnKVxuXG4gICAgIyBGb250XG4gICAgaWYgcHJvY2Vzcy5wbGF0Zm9ybSBpcyAnd2luMzInXG4gICAgICBmb250ID0gYXRvbS5jb25maWcuZ2V0KCdlZGl0b3IuZm9udEZhbWlseScpXG4gICAgICBpZiBmb250XG4gICAgICAgIHN2LnN0eWxlW1wiZm9udEZhbWlseVwiXSA9IGZvbnRcbiAgICAgIGVsc2VcbiAgICAgICAgc3Yuc3R5bGVbXCJmb250RmFtaWx5XCJdID0gXCInU2Vnb2UgVUknLCBNaWNyb3NvZnQgWWFoZWksIHNhbnMtc2VyaWZcIlxuICAgICAgICBzdi5zdHlsZVtcImZvbnRTaXplXCJdID0gXCIxMnB4XCJcblxuICAgICMgTG9hZCBhbGwgc2V0dGluZ3MgcGFuZWxzXG4gICAgbGFzdE1lbnUgPSBzdi5xdWVyeVNlbGVjdG9yKCcucGFuZWxzLW1lbnUgLmFjdGl2ZSBhJylcbiAgICBwYW5lbE1lbnVzID0gc3YucXVlcnlTZWxlY3RvckFsbCgnLnNldHRpbmdzLXZpZXcgLnBhbmVscy1tZW51IGxpIGEnKVxuICAgIGZvciBwbSBpbiBwYW5lbE1lbnVzXG4gICAgICBwbS5jbGljaygpXG4gICAgICBwbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFwcGx5SW5zdGFsbFBhbmVsT25Td2l0Y2gpXG4gICAgIyBSZXN0b3JlIGxhc3QgYWN0aXZlIG1lbnVcbiAgICBsYXN0TWVudS5jbGljaygpIGlmIGxhc3RNZW51XG5cbiAgICAjIG9uIEluaXRcbiAgICBhcHBseVRvUGFuZWwoKVxuXG4gICAgIyBMZWZ0LXNpZGUgbWVudVxuICAgIG1lbnUgPSBzdi5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MtdmlldyAucGFuZWxzLW1lbnUnKVxuICAgIHJldHVybiB1bmxlc3MgbWVudVxuICAgIGZvciBkIGluIFMuU2V0dGluZ3MubWVudVxuICAgICAgZWwgPSBtZW51LnF1ZXJ5U2VsZWN0b3IoXCJbbmFtZT0nI3tkLmxhYmVsfSddPmFcIilcbiAgICAgIGFwcGx5VGV4dFdpdGhPcmcgZWwsIGQudmFsdWVcblxuICAgICMgTGVmdC1zaWRlIGJ1dHRvblxuICAgIGV4dCA9IHN2LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5ncy12aWV3IC5pY29uLWxpbmstZXh0ZXJuYWwnKVxuICAgIGFwcGx5VGV4dFdpdGhPcmcgZXh0LCBcIuaJk+W8gOaPkuS7tua6kOeggeebruW9lVwiXG5cbiAgICAjIEFkZCBFdmVudHNcbiAgICBidG5zID0gc3YucXVlcnlTZWxlY3RvckFsbCgnZGl2LnNlY3Rpb246bm90KC50aGVtZXMtcGFuZWwpIC5zZWFyY2gtY29udGFpbmVyIC5idG4nKVxuICAgIGZvciBidG4gaW4gYnRuc1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXBwbHlJbnN0YWxsUGFuZWxPblN3aXRjaClcblxuICAgICMgY2F0Y2ggZVxuICAgICMgICBjb25zb2xlLmVycm9yIFwi6L2v5Lu25rGJ5YyW5aSx6LSl44CCXCIsIGVcblxubW9kdWxlLmV4cG9ydHMgPSBTZXR0aW5nc1xuIl19
