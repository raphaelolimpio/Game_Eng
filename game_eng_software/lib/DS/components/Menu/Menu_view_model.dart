import 'package:flutter/cupertino.dart';

class MenuViewModel {
  final String title;
  final IconData? icon;
  final Function() onPress;

  MenuViewModel({required this.title, this.icon, required this.onPress});
}
