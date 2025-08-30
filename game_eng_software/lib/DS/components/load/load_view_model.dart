enum LoadColor { normalBlueColor, normalGreenColor, normalRedColor }

enum LoadAnimation { normal, fast, slow }

class LoadViewModel {
  final LoadColor color;
  final LoadAnimation animation;
  final String? message;

  LoadViewModel({
    this.color = LoadColor.normalBlueColor,
    this.animation = LoadAnimation.normal,
    this.message,
  });
}
