import 'package:flutter/cupertino.dart';
import 'package:game_eng_software/DS/shared/color/Colors.dart';

class AppBar extends StatelessWidget implements PreferredSizeWidget {
  final Color backgroundColor;
  final Widget? leading;

  const AppBar({super.key, this.backgroundColor = appBarColor, this.leading});

  @override
  Widget build(BuildContext context) {
    return AppBar(backgroundColor: backgroundColor, leading: leading);
  }

  @override
  Size get preferredSize => Size.fromHeight(50);
}
