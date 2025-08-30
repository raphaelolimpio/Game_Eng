import 'package:flutter/material.dart';
import 'package:screen_loading_handler/screen_loading_controller.dart';
import 'package:screen_loading_handler/screen_loading_handler.dart';

class Load extends StatefulWidget {
  const Load({super.key});

  @override
  State<Load> createState() => _LoadState();
}

class _LoadState extends State<Load> {
  final ScreenLoadingController _loadingController = ScreenLoadingController();
  Future<void> _simulateLoading() async {
    _loadingController.startLoading();
    await Future.delayed(const Duration(seconds: 3));
    _loadingController.stopLoading();
  }

  @override
  Widget build(BuildContext context) {
    return ScreenLoadingHandler(
      controller: _loadingController,
      backgroundColor: Colors.black54,
      loadingBoxColor: Colors.white,
      loadingIndicatorColor: Colors.blue,
      child: Scaffold(
        appBar: AppBar(title: const Text('Screen Loading Handler')),
        body: Center(
          child: ElevatedButton(
            onPressed: _simulateLoading,
            child: const Text('Simulate Loading'),
          ),
        ),
      ),
    );
  }
}
