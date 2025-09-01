import 'package:flutter/material.dart';

// Definindo as cores e estilos do Design System para este exemplo
const Color borderCardFunctionEngColor = Colors.blue;
const Color borderCardFunctionDevFColor = Colors.green;
const Color borderCardFunctionDevBColor = Colors.red;
const Color borderCardFunctionDevOpsColor = Colors.purple;
const Color borderCardFunctionQAColor = Colors.orange;
const Color cardColor = Colors.white;
const Color lightGrayColor = Color(0xFFE0E0E0);
const TextStyle headingTextStyleBlack = TextStyle(
  fontSize: 16,
  fontWeight: FontWeight.bold,
  color: Colors.black,
);
const TextStyle normalTextStyleBlack = TextStyle(
  fontSize: 14,
  color: Colors.black,
);

// Enumeração para os tipos de card
enum CardTypeBordBonus { engenheiro, deveF, deveB, devops, qa }

// Card Function View Model
class CardFunctionViewModel {
  final CardTypeBordBonus cardTypeBorder;
  final int id;
  final String title;
  final String description;
  final Widget? image;
  final IconData? icon;

  CardFunctionViewModel({
    required this.cardTypeBorder,
    required this.id,
    required this.title,
    required this.description,
    this.image,
    this.icon,
  });
}

// Card Function Component
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

// Tela de Exemplo
class CardFunctionExampleScreen extends StatelessWidget {
  const CardFunctionExampleScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Exemplo de dados para os ViewModels
    final CardFunctionViewModel engCard = CardFunctionViewModel(
      title: 'Engenheiro',
      description:
          'Um engenheiro que projeta e constrói sistemas de software complexos.',
      cardTypeBorder: CardTypeBordBonus.engenheiro,
      id: 1,
      image: Image.network(
        'https://via.placeholder.com/300x200.png?text=Engenheiro',
      ),
    );

    final CardFunctionViewModel devFCard = CardFunctionViewModel(
      title: 'Dev Front-end',
      description:
          'Responsável pela interface do usuário e experiência, trabalhando com tecnologias de ponta.',
      cardTypeBorder: CardTypeBordBonus.deveF,
      id: 2,
      icon: Icons.code,
    );

    final CardFunctionViewModel devBCard = CardFunctionViewModel(
      title: 'Dev Back-end',
      description:
          'Cria a lógica do servidor, bancos de dados e a infraestrutura que dá suporte ao front-end.',
      cardTypeBorder: CardTypeBordBonus.deveB,
      id: 3,
      icon: Icons.dns,
    );

    final CardFunctionViewModel devOpsCard = CardFunctionViewModel(
      title: 'DevOps',
      description:
          'Garante que os processos de desenvolvimento e operações estejam fluidos e automatizados.',
      cardTypeBorder: CardTypeBordBonus.devops,
      id: 4,
      icon: Icons.sync,
    );

    final CardFunctionViewModel qaCard = CardFunctionViewModel(
      title: 'QA Tester',
      description:
          'Responsável por testar o software e garantir que ele atenda aos padrões de qualidade.',
      cardTypeBorder: CardTypeBordBonus.qa,
      id: 5,
      icon: Icons.check_circle_outline,
    );

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Exemplo de Cards de Função',
          style: TextStyle(color: Colors.black),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CardFunction.instantiate(engCard),
              const SizedBox(height: 20),
              CardFunction.instantiate(devFCard),
              const SizedBox(height: 20),
              CardFunction.instantiate(devBCard),
              const SizedBox(height: 20),
              CardFunction.instantiate(devOpsCard),
              const SizedBox(height: 20),
              CardFunction.instantiate(qaCard),
            ],
          ),
        ),
      ),
    );
  }
}

// O App principal que inicia a tela de exemplo
void main() {
  runApp(const MaterialApp(home: CardFunctionExampleScreen()));
}
