import 'package:flutter/material.dart';
import 'package:game_eng_software/DS/components/card/model/FunctionCard/card_function_view_model.dart';
import 'package:game_eng_software/DS/shared/color/colors.dart';
import 'package:game_eng_software/DS/shared/style/style.dart';

class CardFunction extends StatelessWidget {
  final CardFunctionViewModel viewModel;

  const CardFunction._({required this.viewModel});

  static Widget instantiate(CardFunctionViewModel viewModel) {
    return CardFunction._(viewModel: viewModel);
  }

  Color _getBorderColor(CardTypeBordBonus type) {
    switch (type) {
      case CardTypeBordBonus.engenheiro:
        return borderCardFunctionEngColor;
      case CardTypeBordBonus.deveF:
        return borderCardFunctionDevFColor;
      case CardTypeBordBonus.deveB:
        return borderCardFunctionDevBColor;
      case CardTypeBordBonus.devops:
        return borderCardFunctionDevOpsColor;
      case CardTypeBordBonus.qa:
        return borderCardFunctionQAColor;
    }
  }

  @override
  Widget build(BuildContext context) {
    final borderColor = _getBorderColor(viewModel.cardTypeBorder);
    const double borderWidth = 5.0;
    const Color cardColor = Colors.white;

    return Container(
      width: 300,
      height: 400,
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(12.0),
        border: Border.all(color: borderColor, width: borderWidth),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 5,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        children: [
          Container(
            height: 60,
            padding: const EdgeInsets.symmetric(horizontal: 12.0),
            alignment: Alignment.centerLeft,
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.9),
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(12.0),
              ),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Text(viewModel.title, style: headingTextStyleBlack),
                ),
                Text('${viewModel.id}', style: headingTextStyleBlack),
              ],
            ),
          ),
          const SizedBox(height: 8.0),

          Container(
            height: 180,
            width: double.infinity,
            padding: const EdgeInsets.all(8.0),
            color: Colors.transparent,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(8.0),
              child: viewModel.image != null
                  ? FittedBox(
                      fit: BoxFit.cover,
                      clipBehavior: Clip.hardEdge,
                      child: viewModel.image!,
                    )
                  : Container(
                      color: lightGrayColor,
                      alignment: Alignment.center,
                      child: const Icon(
                        Icons.image_not_supported,
                        color: Colors.white70,
                        size: 28,
                      ),
                    ),
            ),
          ),
          const SizedBox(height: 8.0),
          Expanded(
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.all(12.0),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.9),
                borderRadius: const BorderRadius.vertical(
                  bottom: Radius.circular(12.0),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    viewModel.description,
                    style: normalTextStyleBlack,
                    maxLines: 4,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 8.0),
                  if (viewModel.icon != null)
                    Align(
                      alignment: Alignment.bottomRight,
                      child: Icon(viewModel.icon, size: 24, color: cardColor),
                    ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
