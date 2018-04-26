/**
 * @file suggestion
 * @author zhujl
 */
define(function (require, exports, module) {

    'use strict';

    var etpl = require('cobble/util/etpl');
    var store = require('common/store');

    var subjectTitle = '<!-- if: ${item.level} == 2 && ${item.type} == 2 -->'
                     + '<h6>在以下分类中搜索 <strong>${item.name|raw}</strong>：</h6>'
                     + '<!-- else -->'
                     + '<h6><strong>${item.name|raw}</strong>分类下的科目：</h6>'
                     + '<!-- /if -->';

    var subjectTags = '<div class="tag-list">'
                    + '<!-- for: ${item.cat} as ${cat} -->'
                    +     '<a class="tag ${cat.type}" href="'
                    +         '<!-- if: ${isWWW} -->'
                    +             '/st/${cat.title}-${cat.cid}.html'
                    +         '<!-- else -->'
                    +             '/${cityDomain}/st-${cat.title}-${cat.cid}.html'
                    +         '<!-- /if -->'
                    +         '">'
                    +         '${cat.title}'
                    +     '</a>'
                    + '<!-- /for -->'
                    + '</div>';

    var subjectItems = '<!-- if: ${item.level} == 2 && ${item.type} == 2 -->'
                     + '<!-- var: q = ${item.title} -->'
                     + '<!-- else -->'
                     + '<!-- var: q = ${cat.title} -->'
                     + '<!-- /if -->'

                     + '<!-- for: ${item.cat} as ${cat} -->'
                     +     '<a class="sub-menu-item" href="'
                     +         '<!-- if: ${isWWW} -->'
                     +             '/st/${q}-${cat.cid}.html'
                     +         '<!-- else -->'
                     +             '/${cityDomain}/st-${q}-${cat.cid}.html'
                     +         '<!-- /if -->'
                     +         '">'
                     +         '${cat.title}'
                     +     '</a>'
                     + '<!-- /for -->';

    exports.menu = etpl.compile(

        '<!-- for: ${list} as ${item} -->'
      +     '<!-- var: size = ${item.cat.length} -->'

      +     '<div class="menu-item" data-size="${size}" data-level="${item.level}" data-type="${item.type}" data-text="${item.title}">'

      +     '<!-- if: ${size} > 0 -->'
      +         '${item.name|raw}<i class="icon icon-chevron-right"></i>'
      +     '<!-- else -->'
      +         '${item.name|raw}'
      +     '<!-- /if -->'

      +         '<div class="sub-menu">'
      +             '<!-- if: ${size} > 0 -->'

      +             '<!-- if: ${item.level} == 1 && ${item.type} == 1 -->'
      +             subjectTitle + subjectItems
      +             '<!-- elif: ${item.level} == 2 && ${item.type} == 1 -->'
      +             subjectTitle + subjectTags
      +             '<!-- elif: ${item.level} == 2 && ${item.type} == 2 -->'
      +             subjectTitle + subjectItems
      +             '<!-- /if -->'

      +             '<!-- /if -->'
      +         '</div>'


      +     '</div>'

      + '<!-- /for -->'

    );

    exports.teacher = etpl.compile(
        '<a class="menu-item teacher-item" data-url="${url}" data-text="${name}" href="${url}" target="_blank">'
      +     '<img class="thumbnail" src="${avatar}" />'
      +     '<span class="teacher-title">'
      +         '<span class="teacher-name" href="${url}">${name}</span>'
      +         '<!-- if: ${organization.shortname} -->'
      +         '<span class="org-label" data-url="${organization.url}">'
      +             '${organization.shortname}'
      +         '</span>'
      +         '<!-- /if -->'
      +         '<!-- for: ${medals} as ${item} -->'
      +             '<i class="icon medal icon-medal-'
      +             '<!-- if: ${item.medal_type} == 11 -->'
      +             'valuegold'
      +             '<!-- elif: ${item.medal_type} == 12 -->'
      +             'valuesilver'
      +             '<!-- elif: ${item.medal_type} == 13 -->'
      +             'valuecopper'
      +             '<!-- elif: ${item.medal_type} == 21 -->'
      +             'populargold'
      +             '<!-- elif: ${item.medal_type} == 22 -->'
      +             'popularsilver'
      +             '<!-- elif: ${item.medal_type} == 23 -->'
      +             'popularcopper'
      +             '<!-- /if -->'
      +             '" title="${item.describe}"></i>'
      +         '<!-- /for -->'
      +     '</span>'
      +     '<span class="teacher-slogan">${slogan}</span>'
      +     '<span class="teacher-course">'
      +         '<i class="icon icon-book-o"></i>'
      +     '<!-- if: ${id} == 98851 -->'
      +         '公共英语'
      +     '<!-- else -->'
      +         '${courses}'
      +     '<!-- /if -->'
      +     '</span>'
      + '</a>'
    );

    exports.org = etpl.compile(
        '<a class="menu-item org-item" data-url="${url}" data-text="${name}" href="${url}" target="_blank">'
      +     '<img class="thumbnail" src="${avatar}" />'
      +     '<span class="org-title">'
      +         '<span class="org-name" href="${url}">${shortname}</span>'
      +     '</span>'
      +     '<span class="org-slogan">${slogan}</span>'
      +     '<span class="org-tags">'
      +     '<!-- for: ${tags} as ${tag} -->'
      +         '<span class="label-default small">${tag}</span>'
      +     '<!-- /for -->'
      +     '</span>'
      +     '<span class="dashboard">'
      +         '<span>'
      +             '<i class="icon icon-user"></i>${teacher_count}位老师'
      +         '</span>'
      +         '<!-- if: ${comment_count} > 0 -->'
      +         '<span>'
      +             '<i class="icon icon-comment"></i>${comment_count}条评论'
      +         '</span>'
      +         '<!-- /if -->'
      +     '</span>'
      + '</a>'
    );


});