import 'package:flutter/cupertino.dart';
import 'package:game_eng_software/DS/components/Menu/Menu_view_model.dart';
import 'package:game_eng_software/DS/shared/style/Style.dart';

class Menu extends StatelessWidget {
  final MenuViewModel viewModel;

  const Menu._({required this.viewModel});

  @override
  Widget build(BuildContext context) {
    String title = viewModel.title;
    IconData? icon = viewModel.icon;
    return Row(
      children: <Widget>[
        if (icon != null) Icon(icon),
        Text(title, style: normalTextStyleBlack),
      ],
    );
  }
}
