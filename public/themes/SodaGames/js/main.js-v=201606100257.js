/*eslint-disable */
'use strict';
var updateCaptchaUrl = function () {
  var captchaUrl = '/captcha?v=' + Math.random()*10000 + (new Date()).valueOf();
  $('.captcha').attr('src', captchaUrl);
  $('input[name=captcha]').val('');
  $('input[name=regcom-captcha]').val('');
}
var sendActivateEmail = function () {
  swal({
    title: '重新发送激活邮件',
    text: '请输入邮箱地址',
    type: 'input',
    closeOnConfirm: false,
    showLoaderOnConfirm: true,
    showCancelButton: true
  }, function (msg) {
    if (msg === false) return;
    $.post('/api/auth/sendActivateEmail', { email: msg }, function (data) {
      if (data.status == 1) {
        swal('操作成功', '激活邮件已经重新发送，请查看邮箱', 'success');
      }
      else {
        swal('操作失败', data.error || '请稍后再试', 'error');
      }
    });
  });
}
var swalError = function (msg) {
  swal('出错了...', msg, 'error');
}
$(function () {
  var regData = {};
  updateCaptchaUrl();
  $('.captcha').on('click', updateCaptchaUrl);
  $('.sendEmail').on('click', sendActivateEmail);
  $('.to-reg').on('click', function () {
    $('html, body').animate({scrollTop: $('#def_1').offset().top}, function () {
      $('input[name=reg-name-0]').focus();
    });
  });
  $.get('/api/auth/login', function (status) {
    if (status === 'OK') {
      if (pageType === 'normal') {
        window.location.href = 'index.html'/*tpa=http://www.kesci.com/apps/home_log/index.html*/;
      } else if (pageType === 'landing') {
        window.location.href = 'index.html#!/competition/'/*tpa=http://www.kesci.com/apps/home_log/index.html#!/competition/*/ + competitionId;
      }
    }
  });
  $.getJSON('/api/skills', function (data) {
    if (data) {
      //console.log(data);
    }
  });
  $('#slider').flexslider({
    animation: "slide",
    animationLoop: true,
    controlNav: false,
    touch: true,
    directionNav: false
  });
  var mobile = false;
  var getWinSize = function () {
    var winWidth, winHeight;
    if (window.innerWidth)
      winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
      winWidth = document.body.clientWidth;
    if (window.innerHeight)
      winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
      winHeight = document.body.clientHeight;
    return {
      w: winWidth,
      h: winHeight
    };
  };
  //- 检查客户端是否为手机
  if (getWinSize().w <= 667) mobile = true;
  var r = 800/1920;
  var scale = 1;
  var resize = function () {
    var winSize = getWinSize();
    var x = winSize.w/1920;
    var mh = 600 > 800*x ? 600 : 800*x;
    if (!mobile) {
      $('section.def_block').css('min-height', mh);
      $('section.def_block#def_1').css('min-height', 800);
      $('#user-0').addClass('active');
      $('.user').on('mouseenter', function () {
        if (!$(this).hasClass('active')) {
          var id = $(this).attr('data-id');
          $('.user.active').removeClass('active');
          $('.details.active').removeClass('active');
          $('#user-' + id).addClass('active');
          $(this).addClass('active');
        }
      });
    } else {
      $('.user').off('mouseenter');
      $('section.def_block').css('min-height', Math.min(winSize.h, 568));
    }
    scale = mh/800;
    //var fs = 15 > 20*x ? 15 : 20*x;
    //fs = Math.min(fs, 16);
    //$('body').css('font-size', fs + 'px');
    if (mobile) {
      $('#slider').height($('#slider').width() * 70/320)
    }
  };
  resize();
  $(window).on('resize', function () {
    if (!mobile) resize();
  });

  // parallax effect controls
  if (!mobile) {
    //- var $window = $(window);
    //- var scrollTime = 1.1;
    //- var scrollDistance = 200;

    //- $window.on("mousewheel DOMMouseScroll", function(event){

    //-   event.preventDefault();

    //-   var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
    //-   var scrollTop = $window.scrollTop();
    //-   var finalScroll = scrollTop - parseInt(delta*scrollDistance);

    //-   TweenMax.to($window, scrollTime, {
    //-     scrollTo : { y: finalScroll, autoKill:true },
    //-       ease: Power1.easeOut,
    //-       overwrite: 5
    //-     });

    //- });

    var speed = 1.5;
    var basicLen = 80;
    var controller = new ScrollMagic.Controller();

    $('#def_2 .layer1').css('bottom', 140 * scale - basicLen*5);
    $('#def_2 .layer2').css('bottom', 230 * scale - basicLen*4);
    $('#def_2 .layer3').css('bottom', 330 * scale - basicLen*3);
    $('#def_2 .layer4').css('bottom', 300 * scale - basicLen*2);
    $('#def_2 .layer5').css('bottom', 120 * scale - basicLen);
    var tween2 = new TimelineMax ()
    .add([
      TweenMax.to("#def_2 .layer1", 1, {bottom: 140 * scale + basicLen*5, ease: Linear.easeNone}),
      TweenMax.to("#def_2 .layer2", 1, {bottom: 230 * scale + basicLen*4, ease: Linear.easeNone}),
      TweenMax.to("#def_2 .layer3", 1, {bottom: 330 * scale + basicLen*3, ease: Linear.easeNone}),
      TweenMax.to("#def_2 .layer4", 1, {bottom: 300 * scale + basicLen*2, ease: Linear.easeNone}),
      TweenMax.to("#def_2 .layer5", 1, {bottom: 120 * scale + basicLen, ease: Linear.easeNone}),
    ]);

    var scene2 = new ScrollMagic.Scene({triggerElement: "#def_2", duration: $('#def_2').height()/speed*2})
    .setTween(tween2)
    //- .addIndicators() // add indicators (requires plugin)
    .addTo(controller);

    $('#def_3 .layer1').css('bottom', 30 * scale - 150);
    var tween3 = new TimelineMax ()
    .add([
      TweenMax.to("#def_3 .layer1", 1, {bottom: 30 * scale, ease: Linear.easeNone})
    ]);

    var scene3 = new ScrollMagic.Scene({triggerElement: "#def_3", duration: $('#def_3').height()/speed})
    .setTween(tween3)
    //- .addIndicators() // add indicators (requires plugin)
    .addTo(controller);

    $('#def_4 .layer1').css('bottom', 75 * scale - basicLen*6);
    $('#def_4 .layer2').css('bottom', 125 * scale - basicLen*5);
    $('#def_4 .layer3').css('bottom', 20 * scale - basicLen*4);
    $('#def_4 .layer4').css('bottom', 30 * scale - basicLen*3);
    $('#def_4 .layer5').css('bottom', 20 * scale - basicLen*2);
    $('#def_4 .layer6').css('bottom', 55 * scale - basicLen);
    var tween4 = new TimelineMax ()
    .add([
      TweenMax.to("#def_4 .layer1", 1, {bottom: 75 * scale + basicLen*6, ease: Linear.easeNone}),
      TweenMax.to("#def_4 .layer2", 1, {bottom: 125 * scale + basicLen*5, ease: Linear.easeNone}),
      TweenMax.to("#def_4 .layer3", 1, {bottom: 20 * scale + basicLen*4, ease: Linear.easeNone}),
      TweenMax.to("#def_4 .layer4", 1, {bottom: 30 * scale + basicLen*3, ease: Linear.easeNone}),
      TweenMax.to("#def_4 .layer5", 1, {bottom: 20 * scale + basicLen*2, ease: Linear.easeNone}),
      TweenMax.to("#def_4 .layer6", 1, {bottom: 55 * scale + basicLen, ease: Linear.easeNone}),
    ]);

    var scene4 = new ScrollMagic.Scene({triggerElement: "#def_4", duration: $('#def_4').height()/speed*2})
    .setTween(tween4)
    //- .addIndicators() // add indicators (requires plugin)
    .addTo(controller);

    $('#def_5 .layer1').css('bottom', 0);
    $('#def_5 .layer2').css('bottom', -18 * scale + basicLen);
    $('#def_5 .layer3').css('bottom', -230 * scale + 2*basicLen);
    $('#def_5 .layer4').css('bottom', -150 * scale + 3*basicLen);
    $('#def_5 .layer5').css('bottom', -95 * scale + 2*basicLen);
    var oriH = $('#def_5').height();
    $('#def_5').css('height', oriH + 5*basicLen);
    var tween5 = new TimelineMax ()
    .add([
      TweenMax.to("#def_5 .layer1", 1, {bottom: 0, ease: Linear.easeNone}),
      TweenMax.to("#def_5 .layer2", 1, {bottom: -18 * scale, ease: Linear.easeNone}),
      TweenMax.to("#def_5 .layer3", 1, {bottom: -230 * scale, ease: Linear.easeNone}),
      TweenMax.to("#def_5 .layer4", 1, {bottom: -150 * scale, ease: Linear.easeNone}),
      TweenMax.to("#def_5 .layer5", 1, {bottom: -95 * scale, ease: Linear.easeNone}),
      TweenMax.to("#def_5", 1, {height: oriH, ease: Linear.easeNone}),
    ]);

    var scene5 = new ScrollMagic.Scene({triggerElement: "#def_5", duration: oriH/speed})
    .setTween(tween5)
    //- .addIndicators() // add indicators (requires plugin)
    .addTo(controller);

    $('#reg-to-login').on('click', function (e) {
      e.preventDefault();
      $('#login-form input[type=email]').focus();
    });
  } else {
    $('#reg-to-login').on('click', function (e) {
      e.preventDefault();
      $('#toReg').hide();
      $('#toLogin').show();
    });
    $('#login-to-reg').on('click', function (e) {
      $('#toReg').show();
      $('#toLogin').hide();
    });
  }

  // 注册界面角色选择
  $('.reg-block .job-list .job-wrapper .job').on('click', function () {
    $('.reg-block .job-list .job-wrapper .job.active').removeClass('active');
    $(this).addClass('active');
    //- if ($(this).hasClass('active')) $(this).removeClass('active');
    //- else $(this).addClass('active');
  });
  $('.reg-block .job-list .job-wrapper .job').on('mouseenter', function () {
    var job = $(this).data('job');
    $('.mid-block').hide();
    $('.mid-block.desp-' + job).removeClass('hidden').show();
  });
  $('.reg-block .job-list .job-wrapper .job').on('mouseleave', function () {
    if ($('.reg-block .job-list .job-wrapper .job.active')[0]) {
      var job = $('.reg-block .job-list .job-wrapper .job.active').data('job');
      $('.mid-block').hide();
      $('.mid-block.desp-' + job).removeClass('hidden').show();
    }
  });
  // 登录
  $('.login-form').on('submit', function (e) {
    e.preventDefault();
    var $msg = $(this).find('.invalid-msg');
    $msg.removeClass('active');
    var email = $(this).find('input[type=email]').val().trim();
    var password = $(this).find('input[type=password]').val().trim();
    var keepLogin = $(this).find('input[type=checkbox]')[0] && $(this).find('input[type=checkbox]')[0].checked;
    if (email === '' || password === '') {
      $msg.html('邮箱地址和密码不能为空').addClass('active');
    } else {
      $.ajax({
        url: '/api/auth/login',
        type: 'POST',
        data: {password: password, email: email, keepLogin: keepLogin},
        success: function (data, textStatus, jqXHR) {
          window.location.href = 'index.html'/*tpa=http://www.kesci.com/apps/home_log/index.html*/;
        },
        error: function (jqXHR, textStatus, errorThrown) {
          if (jqXHR.status === 400) {
            $msg.html(jqXHR.responseText).addClass('active');
          } else {
            showError('未知错误, 请稍后尝试');
          }
        }
      });
    }
  });
  $('#reg-form input').on('focus', function () {
    $('#reg-form input').off('focus');
    $('#reg-form .hide').removeClass('hide');
  });
  $('#reg-form').on('submit', function (e) {
    e.preventDefault();
    var $msg = $(this).find('.invalid-msg');
    $msg.removeClass('active');
    var showError = function (error) {
      $msg.html(error).addClass('active');
      $('#reg-form .hide').removeClass('hide');
      updateCaptchaUrl();
    }
    var data = {type: 'check'};
    data.username = $(this).find('input[name=reg-name-0]').val() + $(this).find('input[name=reg-name-1]').val();
    if (!data.username) {
      return showError('姓名不能为空');
    }
    data.email = $(this).find('input[name=reg-email]').val();
    if (!data.email) {
      return showError('请填写邮箱地址');
    }
    data.password = $(this).find('input[name=reg-password]').val();
    if (!data.password) {
      return showError('请填写密码');
    }
    data.confirmPassword = $(this).find('input[name=reg-confirm-password]').val();
    if (!data.confirmPassword || data.confirmPassword !== data.password) {
      return showError('两次密码输入不一致');
    }
    data.captcha = $(this).find('input[name=captcha]').val();
    if (!data.captcha) {
      return showError('请填写验证码');
    }
    $('#reg-form button').html('提交中...').attr('disabled', true);
    $.ajax({
      url: '/api/auth/register',
      type: 'POST',
      data: data,
      success: function () {
        $('#reg-form button').html('免费注册').removeAttr('disabled');
        regData = data;
        regData.type = 'register';
        regData.skills = [];
        $('#reg-flexslider').flexslider({
          animation: "slide",
          animationLoop: false,
          slideshow: false,
          controlNav: false,
          keyboard: false,
          touch: false,
          directionNav: false
        });
        $('#reg-main').hide();
        $('#reg-flexslider').show();
        if (mobile) {
          $('section.def_block#def_1').css('height', 'auto');
          $('section.def_block#def_1').css('min-height', $('#reg-flexslider').height());
          $('section.def_block#def_1').css('padding-top', '15px');
          $('section.def_block#def_1').css('padding-bottom', '15px');
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $('#reg-form button').html('免费注册').removeAttr('disabled');
        if (jqXHR.status === 400) {
          showError(jqXHR.responseText);
        } else {
          showError('未知错误, 请稍后尝试');
        }
      }
    });
  });
  // reg slider controls
  $('.reg-next-btn').on('click', function () {
    $('#reg-flexslider').flexslider('next');
  });
  $('.reg-prev-btn').on('click', function () {
    $('#reg-flexslider').flexslider('prev');
  });
  $('.submit-role-normal').on('click', function () {
    regData.roles = [];
    var $role = $('.reg-block .job-list .job-wrapper .job.active');
    if ($role.length) {
      regData.roles.push($role.data('id'));
      $('#reg-flexslider').flexslider('next');
    } else {
      swal({
        title: '确认跳过?',
        text: '选择团队角色能够更容易组建团队，确定跳过此步?\n(可稍后在"个人资料"中设置)',
        type: 'warning',
        showCancelButton: true
      }, function (c) {
        if (c) {
          $('#reg-flexslider').flexslider('next');
        }
      })
    }
  });
  $('.skill-block .l1').on('click', function () {
    $(this).next('.l2-wrapper').slideToggle();
    //$('.skill-block .l1.active').removeClass('active').next('.l2-wrapper').slideToggle();
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }
  });
  $('.skill-block .l2').on('click', function () {
    var id = $(this).attr('data-id');
    var name = $(this).html();
    var index = regData.skills.indexOf(id);
    if (index === -1) {
      regData.skills.push(id);
      $(this).addClass('active');
      $('.skill-box').append('<div class="skill" id="skill-' + id + '" data-id="' + id + '">' + name + '<span class="close">&times;</span></div>');
    } else {
      regData.skills.splice(index, 1);
      $(this).removeClass('active');
      $('.skill-box #skill-' + id).remove();
    }
  });
  $('.skill-box').on('click', '.close', function () {
    var $skill = $(this).closest('.skill');
    var id = $skill.attr('data-id');
    $('#' + id).removeClass('active');
    var index = regData.skills.indexOf(id);
    regData.skills.splice(index, 1);
    $skill.remove();
  });
  $('#submit-skill').on('click', function () {
    var self = this;
    $(self).html('提交中...').attr('disabled', 'disabled');
    $.ajax({
      url: '/api/auth/register',
      type: 'POST',
      data: JSON.stringify(regData),
      contentType: 'application/json; charset=utf-8',
      success: function () {
        $(self).html('完成提交').removeAttr('disabled');
        $('#reg-flexslider').flexslider('next');
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $(self).html('完成提交').removeAttr('disabled');
        if (jqXHR.status === 400) {
          swalError(jqXHR.responseText);
        } else {
          swalError('未知错误, 请稍后尝试');
        }
      }
    });
  });
  if (pageType === 'landing') {
    if (window.token) {
      socket.on('connect', function () {
        socket.emit('new landing user', token);
      });
      var submitted = false;
      socket.on('Survey submitted', function () {
        if (!submitted) {
          submitted = true;
          $('#reg-flexslider').flexslider('next');
          $('#survey .text-muted').removeClass('text-muted').addClass('text-success').html('已填写');
          $('#survey button').removeAttr('disabled');
        }
      });
    }
    $('#reg-flexslider').flexslider({
      animation: "slide",
      animationLoop: false,
      slideshow: false,
      controlNav: false,
      keyboard: false,
      touch: false,
      directionNav: false
    });
    $('#reg-main').hide();
    $('#reg-flexslider').show();
    if (mobile) {
      $('section.def_block#def_1').css('height', 'auto');
      $('section.def_block#def_1').css('min-height', $('#reg-flexslider').height());
      $('section.def_block#def_1').css('padding-top', '15px');
      $('section.def_block#def_1').css('padding-bottom', '15px');
    }
    $('.student-1').hide();
    $('select[name=regcom-student-flag]').on('change', function () {
      if ($(this).val() === '0') {
        $('.student-0').show();
        $('.student-0 input').attr('required', 'required');
        $('.student-1').hide();
        $('.student-1 input').removeAttr('required');
        $('.student-1 select').removeAttr('required');
      } else {
        $('.student-0').hide();
        $('.student-0 input').removeAttr('required');
        $('.student-1').show();
        $('.student-1 input').attr('required', 'required');
        $('.student-1 select').attr('required', 'required');
      }
    });
    var clearLoc = function (field, hide) {
      $('.' + field + ' select').html('<option value="">加载中</option>').val('').removeAttr('required');
      if (hide) {
        $('.' + field).hide();
      } else {
        $('.' + field).show();
      }
    }
    var renderLoc = function (field, list) {
      $('.' + field).show();
      $('.' + field + ' select').html('<option value="">未选择</option>').val('').attr('required', 'required').show();
      list.forEach(function (item) {
        $('.' + field + ' select').append('<option value="' + item + '">' + item + '</option>');
      });
    }
    var clearUniv = function (field) {
      $('.' + field + ' select').html('<option value="">未选择</option>').val('');
    }
    var renderUniv = function (field, list) {
      $('.' + field + ' select').html('<option value="">未选择</option>').val('');
      list.forEach(function (item) {
        $('.' + field + ' select').append('<option value="' + item + '">' + item + '</option>');
      });
    }
    var clearMajor = function (field) {
      $('.' + field + ' select').html('<option value="">未选择</option>').val('');
    }
    var renderMajor = function (field, list) {
      $('.' + field + ' select').html('<option value="">未选择</option>').val('');
      list.forEach(function (item) {
        $('.' + field + ' select').append('<option value="' + item._id + '">' + item.Major + '</option>');
      });
    }
    var isInnernode = {};
    clearLoc('L3', true);
    $('.L1 select').on('change', function () {
      var L1 = $(this).val();
      if (!L1) {
        clearLoc('L2');
        clearLoc('L3', true);
        return;
      }
      $.ajax({
        url: '/api/locations',
        data: {
          level1: L1
        },
        success: function (data) {
          var list = data.innernodes;
          list.forEach(function (item) {
            isInnernode[item] = true;
          });
          data.leafnodes.forEach(function(l) {
            list.push(l.Leafnode);
          });
          renderLoc('L2', list);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          swalError('获取列表失败, 请稍后重试');
        }
      });
    });
    $('.L2 select').on('change', function () {
      var L2 = $(this).val();
      if (!L2) {
        clearLoc('L3', true);
        return;
      }
      if (isInnernode[L2]) {
        $.ajax({
          url: '/api/locations',
          data: {
            level1: $('.L1 select').val(),
            level2: L2
          },
          success: function (data) {
            var list = data.innernodes;
            list.forEach(function (item) {
              isInnernode[item] = true;
            });
            data.leafnodes.forEach(function(l) {
              list.push(l.Leafnode);
            });
            if (list.length) {
              renderLoc('L3', list);
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            swalError('获取列表失败, 请稍后重试');
          }
        });
      }
    });
    $('.country select').on('change', function () {
      var country = $(this).val();
      if (!country) {
        clearUniv('province');
        clearUniv('university');
        return;
      }
      $.ajax({
        url: '/api/universities',
        data: {
          country: country
        },
        success: function (data) {
          renderUniv('province', data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          swalError('获取列表失败, 请稍后重试');
        }
      });
    });
    $('.province select').on('change', function () {
      var province = $(this).val();
      if (!province) {
        clearUniv('university');
        return;
      }
      $.ajax({
        url: '/api/universities',
        data: {
          country: $('.country select').val(),
          province: province
        },
        success: function (data) {
          var list = data.map(function (item) {
            return item.University;
          });
          renderUniv('university', list);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          swalError('获取列表失败, 请稍后重试');
        }
      });
    });
    $('.discipline select').on('change', function () {
      var discipline = $(this).val();
      if (!discipline) {
        clearMajor('major');
        return;
      }
      $.ajax({
        url: '/api/majors',
        data: {
          discipline: discipline
        },
        success: function (data) {
          renderMajor('major', data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          swalError('获取列表失败, 请稍后重试');
        }
      });
    });
    var data = {};
    $('#regcom-basic-info').on('submit', function (e) {
      e.preventDefault();
      data.type = 'checkemail';
      data.email = $(this).find('input[name=regcom-email]').val();
      data.username = $(this).find('input[name=regcom-name]').val();
      data.phone = $(this).find('input[name=regcom-phone]').val();
      data.location = {};
      data.location.L1 = $(this).find('.L1 select').val();
      data.location.L2 = $(this).find('.L2 select').val();
      data.location.L3 = $(this).find('.L3 select').val();
      if (!data.email) {
        return swalError('请填写邮箱地址');
      }
      if (!data.username) {
        return swalError('请填写真实姓名');
      }
      if (!data.phone) {
        return swalError('请填写手机号码');
      }
      if (!data.location.L1 || !data.location.L2) {
        return swalError('请选择所在地区');
      }
      $('#regcom-basic-info button.reg-prev-btn').attr('disabled', true);
      $('#regcom-basic-info button#regcom-basic-info').html('检测邮箱地址中...').attr('disabled', true);
      $.ajax({
        url: '/api/auth/register',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function () {
          $('#regcom-basic-info button.reg-prev-btn').removeAttr('disabled');
          $('#regcom-basic-info button#regcom-basic-info').html('下一步').removeAttr('disabled');
          $('#reg-flexslider').flexslider('next');
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $('#regcom-basic-info button.reg-prev-btn').removeAttr('disabled');
          $('#regcom-basic-info button#regcom-basic-info').html('下一步').removeAttr('disabled');
          if (jqXHR.status === 400) {
            swalError(jqXHR.responseText);
          } else {
            swalError('未知错误, 请稍后尝试');
          }
        }
      });
    });
    $('#regcom-detail-info').on('submit', function (e) {
      e.preventDefault();
      data.gender = $(this).find('select[name=regcom-gender]').val();
      if (typeof(data.gender) === 'undefined') {
        return swalError('请选择性别');
      }
      data.studentFlag = $(this).find('select[name=regcom-student-flag]').val();
      if (typeof(data.studentFlag) === 'undefined') {
        return swalError('请选择参赛身份');
      }
      if (data.studentFlag === '0') {
        data.company = $(this).find('input[name=regcom-company]').val();
        data.job = $(this).find('input[name=regcom-job]').val();
        if (!data.company) {
          return swalError('请填写公司名称');
        }
        if (!data.job) {
          return swalError('请填写职业名称');
        }
      } else {
        data.university = {};
        data.university.Country = $(this).find('.country select').val();
        data.university.Province = $(this).find('.province select').val();
        data.university.University = $(this).find('.university select').val();
        data.major = $(this).find('.major select').val();
        if (!data.university.Country || !data.university.Province || !data.university.University) {
          return swalError('请选择就读学校');
        }
        if (!data.major) {
          return swalError('请选择专业');
        }
      }
      $('#reg-flexslider').flexslider('next');
    });
    $('.submit-role-regcom').on('click', function () {
      data.roles = [];
      var $role = $('.reg-block .job-list .job-wrapper .job.active');
      if ($role.length) {
        data.roles.push($role.data('id'));
        $('#reg-flexslider').flexslider('next');
      } else {
        swal({
          title: '确认跳过?',
          text: '选择团队角色能够更容易组建团队，确定跳过此步?\n(可稍后在"个人资料"中设置)',
          type: 'warning',
          showCancelButton: true
        }, function (c) {
          if (c) {
            $('#reg-flexslider').flexslider('next');
          }
        })
      }
    });
    $('#regcom-password').on('submit', function (e) {
      e.preventDefault();
      data.password = $(this).find('input[name=regcom-password]').val();
      data.confirmPassword = $(this).find('input[name=regcom-confirm-password]').val();
      data.captcha = $(this).find('input[name=regcom-captcha]').val();
      data.ditch = $(this).find('select[name=ditch]').val();
      if (!data.password) {
        return swalError('请填写密码');
      }
      if (!data.confirmPassword || data.confirmPassword !== data.password) {
        return swalError('两次密码输入不一致');
      }
      if (!data.captcha) {
        return swalError('请填写验证码');
      }
      if (!data.ditch) {
        return swalError('请选择得知渠道');
      }
      $('#regcom-password button[type=submit]').html('提交中...').attr('disabled', true);
      data.type = 'regcom';
      if (window.token) {
        data.token = token;
      }
      data.competition = competitionId;
      $.ajax({
        url: '/api/auth/register',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function () {
          $('#regcom-password button[type=submit]').html('提交').removeAttr('disabled');
          $('#reg-flexslider').flexslider('next');
          swal('成功', '报名成功, 请查看邮箱激活账户', 'success');
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $('#regcom-password button[type=submit]').html('提交').removeAttr('disabled');
          if (jqXHR.status === 400) {
            swalError(jqXHR.responseText);
          } else {
            swalError('未知错误, 请稍后尝试');
          }
        }
      });
    });
  }
  $('#feedback-form').on('submit', function () {
    setTimeout(function() {
      updateCaptchaUrl();
    }, 1500);
  });
});
