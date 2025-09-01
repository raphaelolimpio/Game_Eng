import 'package:flutter/material.dart';

abstract class BaseCardViewModel {
  String title;
  String description;
  Image? image;

  BaseCardViewModel(this.title, this.description, this.image);

  void display() {
    print("Title: $title");
    print("Description: $description");
    print("Image: ${image?.image}");
  }
}
