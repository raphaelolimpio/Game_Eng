import 'package:flutter/material.dart';
import 'package:game_eng_software/DS/components/card/baseCard/baseCard.dart';
import 'package:game_eng_software/utils/post/post_model_card.dart';

enum CardTypeBordBonus { cardGreen, cardGold, cardBlack }

class CardBonusViewModel extends BaseCardViewModel {
  final CardTypeBordBonus cardTypeBorder;
  final int id;
  final IconData? icon;

  CardBonusViewModel(
    super.title,
    super.description,
    super.image, {
    required this.cardTypeBorder,
    required this.id,
    this.icon,
  });
  PostModelCard toPostModel() {
    return PostModelCard(
      id: id,
      title: title,
      icon: icon,
      image: null,
      description: description,
    );
  }
}
